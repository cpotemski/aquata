import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../helper/base.entity';
import { UserEntity } from '../user/user.entity';
import { User } from '@aquata/api-interfaces';

@Entity({ name: 'fleet' })
export class FleetEntity extends BaseEntity {
  @ManyToOne(type => UserEntity)
  user: UserEntity;

  @ManyToOne(type => UserEntity)
  target: User;

  @Column({ nullable: true })
  action: string;

  @Column({ nullable: true })
  travelTime: number;

  @Column({ nullable: true })
  remainingTime: number;

  @Column({ nullable: true })
  actionTicks: number;

  @Column({ nullable: true })
  returning: boolean;
}
