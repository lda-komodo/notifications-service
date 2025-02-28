import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [KafkaModule, RedisModule],
  exports: [KafkaModule, RedisModule],
})
export class InfrastructureModule {
}
