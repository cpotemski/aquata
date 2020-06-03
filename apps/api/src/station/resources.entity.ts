import { Column, Entity } from 'typeorm';

@Entity({ name: 'resources' })
export class ResourcesEntity {
  @Column({
    nullable: false,
    default: 1000
  })
  aluminium: number;

  @Column({
    nullable: false,
    default: 1000
  })
  steel: number;

  @Column({
    nullable: false,
    default: 1000
  })
  plutonium: number;

  @Column({
    nullable: false,
    default: 100
  })
  energy: number;
}
