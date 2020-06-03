import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildOrderEntity } from './build-order.entity';
import { BuildController } from './build.controller';
import { BuildService } from './build.service';
import { StationModule } from '../station/station.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuildOrderEntity]),
    LoggerModule,
    StationModule,
  ],
  providers: [BuildService],
  exports: [BuildService],
  controllers: [BuildController]
})
export class BuildModule {
}
