import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MyLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: MyLoggerService
  });
  const globalPrefix = 'api';
  app.useLogger(app.get(MyLoggerService));
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
