import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const kafkaConfigService = app.get('KAFKA_SERVICE');
  app.connectMicroservice(kafkaConfigService);

  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap().then(() => {});
