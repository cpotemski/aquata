enum FleetActionEnum {
  ATTACK = 'ATTACK',
  DEFEND = 'DEFEND',
}

export class Fleet {
  id: string;
  userId: string;
  targetUserId: string;
  action?: FleetActionEnum;
  flightTime?: number;
  eta?: number;
  actionTicks?: number;
  returning?: boolean;
}
