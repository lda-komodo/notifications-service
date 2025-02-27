// adapters/in/kafka/kafka-consumer.module.ts
import { Module } from '@nestjs/common';
import { GameEventController } from './controllers/game-event.controller';
import { KafkaModule } from '../../../infrastructure/kafka/kafka.module';
import {InfrastructureModule} from "../../../infrastructure/infrastructure.module";
import { SocialEventController } from './controllers/social-event.controller';

@Module({
    imports: [InfrastructureModule],
    controllers: [GameEventController, SocialEventController],
})
export class KafkaConsumerModule {}