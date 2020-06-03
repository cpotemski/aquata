import { TickData, TickElement } from '../tick';

export class BuildOrderTick implements TickElement {
  name = 'buildOrder';

  tick({ buildOrders, ...rest }: TickData) {
    const updatedBuildOrders = buildOrders.map(order => {
      order.remainingTime -= 1;
      return order;
    });

    //TODO: add finished buildOrders to fleets/scanequip

    return {
      ...rest,
      buildOrders: updatedBuildOrders.filter(order => order.remainingTime >= 1),
      finishedBuildOrders: updatedBuildOrders.filter(order => order.remainingTime < 1)
    };
  }
}
