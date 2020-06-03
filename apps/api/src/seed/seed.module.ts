import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RegistrationModule } from '../registration/registration.module';
import { RegistrationService } from '../registration/registration.service';
import { StationService } from '../station/station.service';
import { StationModule } from '../station/station.module';
import { STAGES } from '@aquata/constants';
import { BuildService } from '../build/build.service';
import { BuildModule } from '../build/build.module';
import { BuildOrderType } from '@aquata/api-interfaces';

@Module({
  imports: [RegistrationModule, UserModule, StationModule, BuildModule],
  providers: [],
  exports: []
})
export class SeedModule {

  constructor(
    private readonly registrationService: RegistrationService,
    private readonly userService: UserService,
    private readonly stationService: StationService,
    private readonly buildService: BuildService,
  ) {
    this.seed();
  }

  async seed() {
    if(process.env.STAGE === STAGES.LOCAL) {
      await this.localSeed();
    }

    await this.deleteAll();

    const userId = await this.registrationService.register({
      email: 'c.potemski@gmail.com',
      password: process.env.ADMIN_PASSWORD,
      userName: 'LordArmageddon',
      stationName: 'Hamburg',
    });

    await this.buildService.create(userId,{
      type: BuildOrderType.SHIP,
      what: 'piranha',
      amount: 1,
    });
  }

  async localSeed() {

  }

  async deleteAll() {
    await this.stationService.deleteAll();
    await this.buildService.deleteAll();
    await this.userService.deleteAll();
  }
}
