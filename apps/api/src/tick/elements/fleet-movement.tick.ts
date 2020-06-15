import { TickData, TickElement } from '../tick';
import { partition } from 'lodash';
import { resetFleet } from '@aquata/helper';

export class FleetMovementTick implements TickElement {
  name = 'fleetMovement';

  tick({ fleets, ...rest }: TickData) {
    const [movingFleets, otherFleets] = partition(fleets, fleet => fleet.action && fleet.remainingTime > 0);
    const updatedFleets = movingFleets.map(fleet => {
      fleet.remainingTime -= 1;

      if (fleet.returning && fleet.remainingTime === 0) {
        resetFleet(fleet);
      }

      return fleet;
    });

    return {
      ...rest,
      fleets: [
        ...otherFleets,
        ...updatedFleets
      ]
    };
  }
}
