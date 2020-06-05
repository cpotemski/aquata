import { User } from './user';

export enum FleetActionEnum {
  ATTACK = 'ATTACK',
  DEFEND = 'DEFEND',
}

export class Fleet {
  id: string;
  user: User;
  target: User;
  action?: FleetActionEnum;
  flightTime?: number;
  remainingTime?: number;
  actionTicks?: number;
  returning?: boolean;
}
