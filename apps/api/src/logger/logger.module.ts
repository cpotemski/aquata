import { MyLoggerService } from './logger.service';
import { Module } from '@nestjs/common';


@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService]
})
export class LoggerModule {
}
