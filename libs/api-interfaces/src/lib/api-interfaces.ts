export class User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class LoginResponse {
  access_token: string
}

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export class News {
  id: string;
  userId: string;
  type: NewsTypeEnum;
  title: String;
  text: String;
}

enum NewsTypeEnum {
  FLEET= 'FLEET',
  FIGHT= 'FIGHT',
  SCAN= 'SCAN',
}

export class Station {
  id: string;
  userId: string;
  name: String;
  x: number;
  y: number;
}

enum ResourceTypeEnum {
  ALUMINIUM = 'ALUMINIUM',
  STEEL = 'STEEL',
  PLUTONIUM = 'PLUTONIUM',
  ENERGY = 'ENERGY',
}


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
