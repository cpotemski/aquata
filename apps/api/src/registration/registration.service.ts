import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { StationService } from '../station/station.service';
import { RegistrationDto } from '@aquata/api-interfaces';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userService: UserService,
    private readonly stationService: StationService,
  ) {}

  async register(data: RegistrationDto) {
    const user = await this.userService.create({
      email: data.email,
      password: data.password,
      name: data.userName,
    });

    await this.stationService.create({
      user,
      name: data.stationName
    });
  }
}
