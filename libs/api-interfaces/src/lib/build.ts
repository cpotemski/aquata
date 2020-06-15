export class BuildOrder {
  type: string;
  amount: number;
  remainingTime: number;
  what: string;
}

export enum BuildOrderType {
  SHIP = 'SHIP',
  HARVESTER = 'HARVESTER',
}
