import { Module } from '@nestjs/common';
import kafkaConfig from './kafka.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

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
              brokers: configService.get<string[]>('kafka-cfg.brokers'),
              clientId: configService.get<string>('kafka-cfg.clientId'),
              retry: {
                retries: configService.get<number>('kafka-cfg.retries'),
                factor: 2,
              },
              connectionTimeout: 3000,
            },
            consumer: {
              groupId: configService.get<string>('kafka-cfg.groupId') + `-${uuidv4()}`,
              allowAutoTopicCreation: true,
            },
            producer: {
              createPartitioner: Partitioners.LegacyPartitioner,
            },
            subscribe:{
              fromBeginning: true,
            }
          },
        }) as KafkaOptions,
      inject: [ConfigService],
    },
  ],
  exports: ['KAFKA_SERVICE'],
})
export class KafkaModule {}
