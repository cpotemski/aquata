import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  providers: [],
  exports: []
})
export class StationModule {}
