import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { FleetEntity } from './fleet.entity';
import { FleetService } from './fleet.service';
import { StationModule } from '../station/station.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FleetEntity]),
    StationModule,
    LoggerModule
  ],
  providers: [FleetService],
  exports: [FleetService],
  // controllers: [FleetController]
})
export class FleetModule {
}
