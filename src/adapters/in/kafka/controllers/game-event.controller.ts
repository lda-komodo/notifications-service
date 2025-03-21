// adapters/in/kafka/game-event.consumer.ts
import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import {
  GAMING_CHALLENGE_COMPLETED_TOPIC,
  GAMING_PLAYER_ITEM_ACQUIRED_TOPIC,
  GAMING_PLAYER_LEVEL_UP_TOPIC,
  GAMING_PVP_TOPIC,
} from '../../../../infrastructure/kafka/kafka.config';
import { BaseEventController } from './base-event.controller';
import {
  GameChallengeCompletedEventPayload,
  GameItemAcquiredEventPayload,
  GameLevelUpEventPayload,
  GamePvPEventPayload,
} from '../../../../core/domain/events/events-payloads';
import { EventType } from '../../../../core/domain/events/event-type.enum';

@Controller()
export class GameEventController extends BaseEventController {
  @EventPattern(GAMING_PLAYER_LEVEL_UP_TOPIC)
  async handlePlayerLevelUpTopicMessage(
    @Payload() event: GameLevelUpEventPayload,
    @Ctx() kafkaContext?: KafkaContext,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} broker-id: ${kafkaContext?.getMessage().key} timestamp: ${event.timestamp} broker-timestamp: ${kafkaContext?.getMessage().timestamp}`,
    );
    return await this.callSupportedUseCase(event, EventType.PLAYER_LEVEL_UP);
  }

  @EventPattern(GAMING_PLAYER_ITEM_ACQUIRED_TOPIC)
  async handleItemAcquiredTopicMessage(
    @Payload() gameItemAcquiredEvent: GameItemAcquiredEventPayload,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${gameItemAcquiredEvent.messageId} timestamp: ${gameItemAcquiredEvent.timestamp}`,
    );
    return await this.callSupportedUseCase(
      gameItemAcquiredEvent,
      EventType.ITEM_ACQUIRED,
    );
  }

  @EventPattern(GAMING_PVP_TOPIC)
  async handlePvPTopicMessage(
    @Payload() event: GamePvPEventPayload,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(event, EventType.PVP);
  }

  @EventPattern(GAMING_CHALLENGE_COMPLETED_TOPIC)
  async handleChallengeCompletedTopicMessage(
    @Payload() event: GameChallengeCompletedEventPayload,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(
      event,
      EventType.CHALLENGE_COMPLETED,
    );
  }
}
