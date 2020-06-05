import { TickData, TickElement } from '../tick';
import { partition } from 'lodash';

export class FightTick implements TickElement {
  name = 'fight';

  tick({ fleets,  ...rest }: TickData) {
    const [fightingFleets, otherFleets] = partition(fleets, fleet => fleet.action && fleet.actionTicks > 0 && fleet.remainingTime < 1);

    const updatedFleets = fightingFleets.map(fleet => {
      fleet.actionTicks -= 1;

      //TODO: fight

      // send fleet back home after fight
      if(fleet.actionTicks === 0) {
        fleet.remainingTime = fleet.travelTime;
        fleet.returning = true;
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
