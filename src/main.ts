import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { KafkaModule } from './infrastructure/kafka/kafka.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const kafkaConfigService = app.get('KAFKA_SERVICE');
  app.connectMicroservice(kafkaConfigService);

  await app.startAllMicroservices();
  logger.log('Kafka Microservice is listening');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`HTTP server is running on http://localhost:${port}`);
}

bootstrap().then(() => {});