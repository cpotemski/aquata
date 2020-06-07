import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FleetService } from './fleet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../helper/user.decorator';
import { FleetEntity } from './fleet.entity';
import { MoveShipsDto } from '@aquata/api-interfaces';

@Controller('fleet')
export class FleetController {
  constructor(
    private readonly fleetService: FleetService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('move-ships')
  moveShips(@User() user, @Body() moveShipsDto: MoveShipsDto): Promise<FleetEntity[]> {
    return this.fleetService.moveShips(user.id, moveShipsDto);
  }
}
