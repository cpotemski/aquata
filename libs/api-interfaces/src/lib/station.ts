import { MapCoordinates } from './map';
import { User } from './user';

export class Station {
  id: string;
  user: User;
  name: String;
  coordinates: MapCoordinates;
  resources: Resources;
}

export class CreateStationDto {
  user: User;
  name: string;
}

export class Resources {
  aluminium: number;
  steel: number;
  plutonium: number;
  energy: number;
}


enum ResourceTypeEnum {
  ALUMINIUM = 'ALUMINIUM',
  STEEL = 'STEEL',
  PLUTONIUM = 'PLUTONIUM',
  ENERGY = 'ENERGY',
}
