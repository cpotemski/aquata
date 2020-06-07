import { TickData, TickElement } from '../tick';
import { add } from '@aquata/helper';
import { partition } from 'lodash';

export class BuildOrderTick implements TickElement {
  name = 'buildOrder';

  tick({ buildOrders, fleets, ...rest }: TickData) {
    const updatedBuildOrders = buildOrders.map(order => {
      order.remainingTime -= 1;
      return order;
    });

    const [ordersFinished, ordersInProgress] = partition(updatedBuildOrders, order => order.remainingTime < 1);

    ordersFinished.forEach(order => {
      const fleet = fleets.find(f => f.baseFleet && f.user.id === order.user.id);
      fleet.ships = add(fleet.ships, {
        [order.what]: order.amount
      });
    });

    //TODO: add finished harvesters and scanequip to station

    return {
      ...rest,
      fleets,
      buildOrders: ordersInProgress,
      finishedBuildOrders: ordersFinished
    };
  }
}
