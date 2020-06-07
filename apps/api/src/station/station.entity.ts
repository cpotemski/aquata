import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../helper/base.entity';
import { UserEntity } from '../user/user.entity';
import { ResourcesEntity } from './resources.entity';
import { MapCoordinatesEntity } from '../helper/map-coordinates.entity';
import { Resources, User } from '@aquata/api-interfaces';

@Entity({ name: 'station' })
export class StationEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user: User;

  @Column(type => MapCoordinatesEntity)
  coordinates: MapCoordinatesEntity;

  @Column(type => ResourcesEntity)
  resources: Resources;
}
