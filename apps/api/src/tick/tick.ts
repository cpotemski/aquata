import { StationEntity } from '../station/station.entity';
import { BuildOrderEntity } from '../build/build-order.entity';
import { FleetEntity } from '../fleet/fleet.entity';
import { Fights } from './elements/fight.tick';

export abstract class TickElement {
  name: string;

  abstract tick(data: TickData)
}

export class TickData {
  stations: StationEntity[];
  buildOrders: BuildOrderEntity[];
  finishedBuildOrders: BuildOrderEntity[];
  fleets: FleetEntity[];
  fights?: Fights;
}
