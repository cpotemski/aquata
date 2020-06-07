import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StationService } from './station.service';
import { StationEntity } from './station.entity';

@Controller('station')
export class StationController {
  constructor(
    private readonly stationService: StationService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getStation(@Request() req): Promise<StationEntity[]> {
    return this.stationService.getAll();
  }
}
