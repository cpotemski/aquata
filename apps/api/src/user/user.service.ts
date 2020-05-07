import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from '@aquata/api-interfaces';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;
  constructor(
    private readonly connection: Connection
  ) {
    this.userRepository = connection.getRepository(User);
  }
  findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ id });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
}
