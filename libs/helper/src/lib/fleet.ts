import { Fleet } from '@aquata/api-interfaces';

export const resetFleet = (fleet: Fleet) => {
  fleet.travelTime = null;
  fleet.returning = null;
  fleet.actionTicks = null;
  fleet.action = null;
  fleet.target = null;
  fleet.remainingTime = null;
};


export const shipsAvailable = (fleet: Fleet): boolean =>
  Object.values(fleet.ships) && Object.values(fleet.ships).some(ship => ship > 0);
