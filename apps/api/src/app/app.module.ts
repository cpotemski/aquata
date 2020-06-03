import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { StationModule } from '../station/station.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from '../seed/seed.module';
import { TickModule } from '../tick/tick.module';
import { BuildModule } from '../build/build.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_CONNECTION_STRING,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      autoLoadEntities: true
    }),
    AuthModule,
    UserModule,
    StationModule,
    SeedModule,
    BuildModule,
    TickModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
