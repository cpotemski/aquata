import { Module } from '@nestjs/common';
import { TickService } from './tick.service';
import { StationModule } from '../station/station.module';
import { ResourceIncomeTick } from './elements/resource-income.tick';
import { LoggerModule } from '../logger/logger.module';
import { BuildModule } from '../build/build.module';
import { BuildOrderTick } from './elements/build-order.tick';
import { FleetMovementTick } from './elements/fleet-movement.tick';
import { FightTick } from './elements/fight.tick';
import { FleetModule } from '../fleet/fleet.module';

@Module({
  imports: [StationModule, LoggerModule, BuildModule, FleetModule],
  providers: [TickService],
  exports: [TickService]
})
export class TickModule {
  constructor(
    private readonly tickService: TickService
  ) {
    this.tickService.register([
      new ResourceIncomeTick(),
      new BuildOrderTick(),
      new FleetMovementTick(),
      new FightTick(),
    ]);

    //TODO: only start tick if enabled
    this.tickService.startTick();
  }
}
