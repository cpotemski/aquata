import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../helper/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'build_order' })
export class BuildOrderEntity extends BaseEntity {
  @ManyToOne(type => UserEntity)
  user: UserEntity;

  @Column()
  type: string;

  @Column()
  what: string;

  @Column()
  amount: number;

  @Column()
  remainingTime: number;
}
