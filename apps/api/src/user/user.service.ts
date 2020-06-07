import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '@aquata/api-interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '@aquata/helper';
import { MyLoggerService } from '../logger/logger.service';

@Injectable()
export class UserService extends GenericService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    logger: MyLoggerService
  ) {
    super(userRepository, logger);
  }

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ email });
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({ email: data.email });
    if (existingUser) {
      throw Error('A user with this email already exists!');
    }

    //TODO: crypt user password
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}
