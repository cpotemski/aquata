import { Resources } from '@aquata/api-interfaces';

export enum ShipType {
  NORMAL = 'NORMAL',
  EMP = 'EMP',
  FIRSTSTRIKE = 'FIRSTSTRIKE',
}

export class Ship {
  name: string;
  type: ShipType;
  costs: Resources;
  speed: number;
  travelCosts: number;
  health: number;
  cannons: number;
  firePower: number;
  buildTime: number;
}

export const ships: Ship[] = [
  {
    name: 'piranha',
    type: ShipType.FIRSTSTRIKE,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'jellyfish',
    type: ShipType.EMP,
    costs: {
      aluminium: 0,
      steel: 1250,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 2,
    health: 2,
    cannons: 1,
    firePower: 0,
    buildTime: 4
  },
  //TODO: copy correct values for remaining ships from old game
  {
    name: 'shark',
    type: ShipType.NORMAL,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'hackboat',
    type: ShipType.NORMAL,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'taifun',
    type: ShipType.NORMAL,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'blizzard',
    type: ShipType.EMP,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'hurricane',
    type: ShipType.FIRSTSTRIKE,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'tsunami',
    type: ShipType.NORMAL,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'enterprise',
    type: ShipType.NORMAL,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'bermuda',
    type: ShipType.EMP,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'kittyhawk',
    type: ShipType.FIRSTSTRIKE,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: 'atlantis',
    type: ShipType.NORMAL,
    costs: {
      aluminium: 1250,
      steel: 0,
      plutonium: 0,
      energy: 0
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
];
