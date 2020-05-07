import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { Connection, Repository } from 'typeorm';
import { Station } from '../station/station.entity';

@Module({
  imports: [UserModule],
  providers: [],
  exports: []
})
export class SeedModule {
  private userRepository: Repository<User>;
  private stationRepository: Repository<Station>;
  constructor(
    private readonly userService: UserService,
    private readonly connection: Connection,
  ) {
    this.userRepository = connection.getRepository(User);
    this.stationRepository = connection.getRepository(Station);
    if(process.env.STAGE === 'local') {
      this.localSeed();
    }
    this.seed();
    console.log('seed complete');
  }

  async localSeed() {

  }

  async seed() {
    await this.userRepository.delete({});
    const arma = await this.userService.create({
      email: 'c.potemski@gmail.com',
      password: process.env.ADMIN_PASSWORD,
      name: 'LordArmageddon'
    });
    await this.stationRepository.delete({})
    await this.stationRepository.create({
      name: 'Hamburg',
      user: arma,
      coordinates: {
        x: 1,
        y: 1
      }
    })
  }
}
