import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../helper/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
