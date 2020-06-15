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
import { FleetActionEnum } from '@aquata/api-interfaces';
import { FleetService } from '../fleet/fleet.service';
import { FleetModule } from '../fleet/fleet.module';
import { ResourceService } from '../station/resource.service';

@Module({
  imports: [RegistrationModule, UserModule, StationModule, BuildModule, FleetModule],
  providers: [],
  exports: []
})
export class SeedModule {

  constructor(
    private readonly registrationService: RegistrationService,
    private readonly userService: UserService,
    private readonly stationService: StationService,
    private readonly buildService: BuildService,
    private readonly fleetService: FleetService,
    private readonly resourceService: ResourceService
  ) {
    this.seed();
  }

  async seed() {
    if (process.env.STAGE === STAGES.LOCAL) {
      await this.localSeed();
    }

    await this.deleteAll();

    const armaId = await this.registrationService.register({
      email: 'c.potemski@gmail.com',
      password: process.env.ADMIN_PASSWORD,
      userName: 'LordArmageddon',
      stationName: 'Hamburg'
    });

    await this.resourceService.addResources(armaId, {
      aluminium: 10000,
      plutonium: 10000
    });

    const tiroId = await this.registrationService.register({
      email: 'e.mail@hamburg.de',
      password: 'tiro',
      userName: 'Tirofijo',
      stationName: 'da wo´s Chaos herrscht'
    });

    const botId = await this.registrationService.register({
      email: 'bot@aquata.online',
      password: 'bot',
      userName: 'Bot',
      stationName: 'Aquata'
    });

    await this.buildService.create(armaId, {
      piranha: 1
    });

    await this.fleetService.create(armaId, true);
    const armaFleet = await this.fleetService.create(armaId);
    await this.fleetService.addShips(armaFleet.id, {
      piranha: 99,
      jellyfish: 123,
      shark: 19
    });
    await this.fleetService.startFleet(armaId, armaFleet.id, tiroId, FleetActionEnum.ATTACK, 3);

    const tiroFleet = await this.fleetService.create(tiroId, true);
    await this.fleetService.addShips(tiroFleet.id, {
      piranha: 100,
      jellyfish: 22
    });

    const botFleet = await this.fleetService.create(botId);
    await this.fleetService.addShips(botFleet.id, {
      hackboat: 50,
      shark: 5
    });
    await this.fleetService.startFleet(botId, botFleet.id, tiroId, FleetActionEnum.DEFEND, 6);
  }

  async localSeed() {

  }

  async deleteAll() {
    await this.stationService.deleteAll();
    await this.buildService.deleteAll();
    await this.fleetService.deleteAll();
    await this.userService.deleteAll();
  }
}
