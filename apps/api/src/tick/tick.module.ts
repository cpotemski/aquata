import { Module } from '@nestjs/common';
import { TickService } from './tick.service';
import { StationModule } from '../station/station.module';
import { ResourceIncomeTick } from './elements/resource-income.tick';
import { LoggerModule } from '../logger/logger.module';
import { BuildModule } from '../build/build.module';
import { BuildOrderTick } from './elements/build-order.tick';

@Module({
  imports: [StationModule, LoggerModule, BuildModule],
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
    ]);

    //TODO: only start tick if enabled
    this.tickService.startTick();
  }
}
