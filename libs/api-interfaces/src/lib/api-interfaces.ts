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

export class CreateStationDto {
  user: User;
  name: string;
}

export class RegistrationDto {
  email: string;
  password: string;
  userName: string;
  stationName: string;
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

export class Coordinates {
  x: number;
  y: number;
}

export class Resources {
  aluminium: number;
  steel: number;
  plutonium: number;
  energy: number;
}

export class Station {
  id: string;
  user: User;
  name: String;
  coordinates: Coordinates;
  resources: Resources;
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
