import { Column } from 'typeorm';

export class Resources {
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
