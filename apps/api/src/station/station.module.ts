import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from './station.entity';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { ResourceService } from './resource.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StationEntity]),
    LoggerModule
  ],
  providers: [StationService, ResourceService],
  exports: [StationService, ResourceService],
  controllers: [StationController]
})
export class StationModule {
}
