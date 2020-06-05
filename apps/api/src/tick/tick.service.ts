import { TickData, TickElement } from './tick';
import { TICK_INTERVAL } from '@aquata/constants';
import { StationService } from '../station/station.service';
import { Injectable } from '@nestjs/common';
import { MyLoggerService } from '../logger/logger.service';
import { BuildService } from '../build/build.service';
import { FleetService } from '../fleet/fleet.service';

@Injectable()
export class TickService {
  private elements: TickElement[] = [];

  constructor(
    private readonly logger: MyLoggerService,
    private readonly stationService: StationService,
    private readonly buildService: BuildService,
    private readonly fleetService: FleetService
  ) {
  }

  startTick() {
    setTimeout(() => {
      this.executeTick();
    }, this.getTickOffset());
  }

  register(elements: TickElement[]) {
    this.logger.debug(`registered Tick elements: [${elements.map(element => element.name).join(', ')}]`);
    this.elements = elements;
  }

  getTickOffset() {
    return (TICK_INTERVAL * 1000) - ((new Date()).getTime() % (TICK_INTERVAL * 1000));
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async executeTick() {
    if (this.elements && this.elements.length > 0) {
      let tickData = await this.gatherData();
      for (const element of this.elements) {
        this.logger.time(element.name, 'Tick');
        tickData = await element.tick(tickData);
      }

      this.logger.time('Write to DB', 'Tick');
      await this.persist(tickData);

      this.logger.timeEnd('Tick');
    }

    await this.timeout(this.getTickOffset());
    this.executeTick();
  }

  private async gatherData(): Promise<TickData> {
    const stations = await this.stationService.getStationList();
    const buildOrders = await this.buildService.getBuildOrders();
    const fleets = await this.fleetService.getFleets();

    return {
      stations,
      buildOrders,
      finishedBuildOrders: [],
      fleets,
    };
  }

  private async persist(tickData: TickData) {
    await this.stationService.save(tickData.stations);
    await this.buildService.save(tickData.buildOrders);
    await this.buildService.delete(tickData.finishedBuildOrders);
    await this.fleetService.save(tickData.fleets);
  }
}
