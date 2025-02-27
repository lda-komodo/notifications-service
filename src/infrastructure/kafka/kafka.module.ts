import { Module } from '@nestjs/common';
import kafkaConfig from "../../shared/config/kafka.config";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [kafkaConfig] }),
    ],
    providers: [
        {
            provide: 'KAFKA_SERVICE',
            useFactory: (configService: ConfigService) => ({
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: configService.get<string[]>('kafka.brokers') ?? [],
                        clientId: configService.get<string>('kafka.clientId') ?? 'default-client-id',
                    },
                    consumer: {
                        groupId: configService.get<string>('kafka.groupId') ?? 'default-group-id',
                        retry: {
                            retries: configService.get<number>('kafka.retries') ?? 5,
                        },
                    },
                },
            }),
            inject: [ConfigService],
        },
    ],
    exports: ['KAFKA_SERVICE'],
})
export class KafkaModule {}
