import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto, User } from '@aquata/api-interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ email });
  }

  findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ id });
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({ email: data.email });
    if (existingUser) {
      throw Error('A user with this email already exists!');
    }

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  getUserList(): Promise<User[]> {
    return this.userRepository.find({ select: ['id', 'name'] });
  }

  async deleteAll() {
    return this.userRepository.delete({});
  }
}
