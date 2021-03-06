import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    //TODO: bcrypt password
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email }: { email: string }) {
    const user = await this.usersService.findByEmail(email);
    const { password, ...userWithoutPassword } = user;
    return {
      access_token: this.jwtService.sign({ id: user.id }),
      ...userWithoutPassword
    };
  }
}
