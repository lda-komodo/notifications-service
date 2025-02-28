import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaConfigService = app.get('KAFKA_SERVICE');
  app.connectMicroservice(kafkaConfigService);

  await app.startAllMicroservices();
  logger.log('Kafka Microservice is listening');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`HTTP server is running on http://localhost:${port}`);
}

bootstrap().then(() => {
  logger.log('Up and running');
});
