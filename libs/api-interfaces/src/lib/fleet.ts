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
  ships: Ships;
}

export class Ships {
  piranha?: number;
  jellyfish?: number;
  shark?: number;
  hackboat?: number;
  taifun?: number;
  blizzard?: number;
  hurricane?: number;
  tsunami?: number;
  enterprise?: number;
  bermuda?: number;
  kittyhawk?: number;
  atlantis?: number;
}

export class MoveShipsDto {
  fromId: string;
  toId: string;
  ships: Ships;
}
