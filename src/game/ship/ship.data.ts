import { $Enums } from "@prisma/client"

export enum FightType {
  EMP = "EMP",
  FIRSTSTRIKE = "FIRSTSTRIKE",
  NORMAL = "NORMAL",
}

export interface Ship {
  name: $Enums.ShipType,
  type: FightType,
  costs: {
    aluminium?: number,
    steel?: number,
  },
  speed: number,
  travelCosts: number,
  health: number,
  cannons: number,
  firePower: number,
  buildTime: number
}

export const SHIP_DATA: Ship[] = [
  {
    name: $Enums.ShipType.Piranha,
    type: FightType.FIRSTSTRIKE,
    costs: {
      aluminium: 1250,
    },
    speed: 5,
    travelCosts: 3,
    health: 3,
    cannons: 1,
    firePower: 2,
    buildTime: 4
  },
  {
    name: $Enums.ShipType.Jellyfish,
    type: FightType.EMP,
    costs: {
      steel: 1250,
    },
    speed: 5,
    travelCosts: 2,
    health: 5,
    cannons: 1,
    firePower: 0,
    buildTime: 4
  },
  {
    name: $Enums.ShipType.Shark,
    type: FightType.NORMAL,
    costs: {
      aluminium: 2000,
      steel: 1000,
    },
    speed: 5,
    travelCosts: 3,
    health: 10,
    cannons: 2,
    firePower: 7,
    buildTime: 8
  },
  {
    name: $Enums.ShipType.HackBoat,
    type: FightType.NORMAL,
    costs: {
      aluminium: 2000,
      steel: 750,
    },
    speed: 5,
    travelCosts: 3,
    health: 15,
    cannons: 0,
    firePower: 0,
    buildTime: 12
  },
  {
    name: $Enums.ShipType.Taifun,
    type: FightType.NORMAL,
    costs: {
      aluminium: 6750,
      steel: 2000,
    },
    speed: 5,
    travelCosts: 3,
    health: 40,
    cannons: 6,
    firePower: 4,
    buildTime: 9
  },
  {
    name: $Enums.ShipType.Blizzard,
    type: FightType.EMP,
    costs: {
      aluminium: 2000,
      steel: 8000,
    },
    speed: 5,
    travelCosts: 3,
    health: 30,
    cannons: 3,
    firePower: 0,
    buildTime: 12
  },
  {
    name: $Enums.ShipType.Hurricane,
    type: FightType.FIRSTSTRIKE,
    costs: {
      aluminium: 10000,
      steel: 3000,
    },
    speed: 5,
    travelCosts: 3,
    health: 50,
    cannons: 4,
    firePower: 6,
    buildTime: 12
  },
  {
    name: $Enums.ShipType.Tsunami,
    type: FightType.NORMAL,
    costs: {
      aluminium: 12000,
      steel: 4000,
    },
    speed: 5,
    travelCosts: 3,
    health: 150,
    cannons: 3,
    firePower: 25,
    buildTime: 16
  },
  {
    name: $Enums.ShipType.Enterprise,
    type: FightType.NORMAL,
    costs: {
      aluminium: 24000,
      steel: 6000,
    },
    speed: 5,
    travelCosts: 3,
    health: 250,
    cannons: 8,
    firePower: 15,
    buildTime: 20
  },
  {
    name: $Enums.ShipType.Bermuda,
    type: FightType.EMP,
    costs: {
      aluminium: 14000,
      steel: 12000,
    },
    speed: 5,
    travelCosts: 3,
    health: 250,
    cannons: 5,
    firePower: 0,
    buildTime: 4
  },
  {
    name: $Enums.ShipType.KittyHawk,
    type: FightType.FIRSTSTRIKE,
    costs: {
      aluminium: 36000,
      steel: 9000,
    },
    speed: 5,
    travelCosts: 3,
    health: 300,
    cannons: 5,
    firePower: 20,
    buildTime: 20
  },
  {
    name: $Enums.ShipType.Atlantis,
    type: FightType.NORMAL,
    costs: {
      aluminium: 70000,
      steel: 16000,
    },
    speed: 5,
    travelCosts: 3,
    health: 500,
    cannons: 100,
    firePower: 5,
    buildTime: 24
  },
];
