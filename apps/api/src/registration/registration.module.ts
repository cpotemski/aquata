import { Module } from '@nestjs/common';
import { StationModule } from '../station/station.module';
import { UserModule } from '../user/user.module';
import { RegistrationService } from './registration.service';

@Module({
  imports: [UserModule, StationModule],
  providers: [RegistrationService],
  exports: [RegistrationService]
})
export class RegistrationModule {}
