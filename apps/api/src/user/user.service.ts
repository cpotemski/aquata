import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from '@aquata/api-interfaces';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ id });
  }

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({email: data.email});
    if(existingUser) {
      throw Error('A user with this email already exists!');
    }

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  getUserList(): Promise<User[]> {
    return this.userRepository.find({ select: [ 'id', 'name' ]})
  }

  async deleteAll() {
    return this.userRepository.delete({});
  }
}
