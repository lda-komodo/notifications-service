import { Module } from '@nestjs/common';
import kafkaConfig from './kafka.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [ConfigModule.forRoot({ load: [kafkaConfig] })],
  providers: [
    {
      provide: 'KAFKA_SERVICE',
      useFactory: (configService: ConfigService) =>
        ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: configService.get<string[]>('kafka.brokers'),
              clientId: configService.get<string>('kafka.clientId'),
              retry: {
                retries: configService.get<number>('kafka.retries'),
                factor: 2,
              },
              connectionTimeout: 3000,
            },
            consumer: {
              groupId: configService.get<string>('kafka.groupId'),
              allowAutoTopicCreation: true,
            },
            producer: {
              createPartitioner: Partitioners.LegacyPartitioner,
            },
          },
        }) as KafkaOptions,
      inject: [ConfigService],
    },
  ],
  exports: ['KAFKA_SERVICE'],
})
export class KafkaModule {}
