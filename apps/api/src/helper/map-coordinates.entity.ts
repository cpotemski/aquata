import { Column } from 'typeorm';

export class MapCoordinatesEntity {
  @Column({ nullable: false })
  x: number;

  @Column({ nullable: false })
  y: number;
}
