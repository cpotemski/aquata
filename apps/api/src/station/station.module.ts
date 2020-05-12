import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { StationService } from './station.service';
import { StationController } from './station.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  providers: [StationService],
  exports: [StationService],
  controllers: [StationController]
})
export class StationModule {}
