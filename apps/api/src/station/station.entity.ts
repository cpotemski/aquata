import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../helper/base.entity';
import { User } from '../user/user.entity';
import { Resources } from '../helper/resources.entity';
import { MapCoordinates } from '../helper/map-coordinates.entity';

@Entity()
export class Station extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @Column(type => MapCoordinates)
  coordinates: MapCoordinates;

  @Column(type => Resources)
  resources: Resources;
}
