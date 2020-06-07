import { TickData, TickElement } from '../tick';
import { add } from '@aquata/helper';

export class ResourceIncomeTick implements TickElement {
  name = 'resources';

  tick({ stations, ...rest }: TickData) {
    const updatedStations = stations.map(station => {

      //TODO: Calculate income for station
      station.resources = add(station.resources, {
        aluminium: Math.floor(Math.random() * 1000),
        steel: Math.floor(Math.random() * 1000),
        plutonium: Math.floor(Math.random() * 1000),
        energy: 0
      });

      return station;
    });
    return {
      ...rest,
      stations: updatedStations
    };
  }
}
