import { Inject, Injectable } from '@nestjs/common';
import {
  ProcessedEventsRepositoryInterface,
} from '../../../core/domain/ports/out/processed-events.repository.interface';
import Redis from 'ioredis';

@Injectable()
export class RedisProcessedEventsRepository
  implements ProcessedEventsRepositoryInterface {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
  }

  async exists(eventId: string): Promise<boolean> {
    const result = await this.redisClient.get(eventId);
    return result !== null;
  }

  async save(eventId: string, ttl: number): Promise<void> {
    await this.redisClient.set(eventId, 'PROCESSED', 'EX', ttl);
  }
}
