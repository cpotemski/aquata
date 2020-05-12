import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Station } from './station.entity';
import { StationService } from './station.service';

@Controller('station')
export class StationController {
  constructor(
    private readonly stationService: StationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getStation(@Request() req): Promise<Station[]> {
    return this.stationService.getStationList();
  }
}
