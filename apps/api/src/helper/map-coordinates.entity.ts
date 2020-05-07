import { Column } from 'typeorm';

export class MapCoordinates {
  @Column({ nullable: false })
  x: number;

  @Column({ nullable: false })
  y: number;
}
