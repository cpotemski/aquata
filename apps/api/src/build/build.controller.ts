import { User } from '../helper/user.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BuildService } from './build.service';
import { BuildOrder, BuildOrderType } from '@aquata/api-interfaces';

@Controller('build')
export class BuildController {
  constructor(
    private readonly buildService: BuildService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('ship')
  getShipBuildOrders(@User() user): Promise<BuildOrder[]> {
    return this.buildService.findByUserIdAndType(user.id, BuildOrderType.SHIP);
  }
}
