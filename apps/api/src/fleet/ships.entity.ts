import { Column, Entity } from 'typeorm';

@Entity({ name: 'ships' })
export class ShipsEntity {
  @Column({ nullable: true })
  piranha: number;

  @Column({ nullable: true })
  jellyfish: number;

  @Column({ nullable: true })
  shark: number;

  @Column({ nullable: true })
  hackboat: number;

  @Column({ nullable: true })
  taifun: number;

  @Column({ nullable: true })
  blizzard: number;

  @Column({ nullable: true })
  hurricane: number;

  @Column({ nullable: true })
  tsunami: number;

  @Column({ nullable: true })
  enterprise: number;

  @Column({ nullable: true })
  bermuda: number;

  @Column({ nullable: true })
  kittyhawk: number;

  @Column({ nullable: true })
  atlantis: number;

}
