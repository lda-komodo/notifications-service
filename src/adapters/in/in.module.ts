import { Module } from '@nestjs/common';
import { KafkaConsumerModule } from './kafka/kafka-consumer.module';
import {InfrastructureModule} from "../../infrastructure/infrastructure.module";

@Module({
  imports: [KafkaConsumerModule, InfrastructureModule],
  providers: [],
})
export class InAdaptersModule {}
