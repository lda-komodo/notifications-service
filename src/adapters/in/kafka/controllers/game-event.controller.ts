// adapters/in/kafka/game-event.consumer.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GAMING_PLAYER_ITEM_ACQUIRED_TOPIC,
  GAMING_PLAYER_LEVEL_UP_TOPIC,
} from '../../../../shared/config/kafka.config';
import { BaseEventController } from './base-event.controller';
import { GameItemAcquiredEvent, GameLevelUpEvent } from '../../../../core/domain/events/types';
import { EventType } from '../../../../core/domain/events/event-type.enum';

@Controller()
export class GameEventController extends BaseEventController {
  @MessagePattern(GAMING_PLAYER_LEVEL_UP_TOPIC)
  async handlePlayerLevelUpTopicMessage(
    @Payload() gameLevelUpEvent: GameLevelUpEvent,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${gameLevelUpEvent.messageId} timestamp: ${gameLevelUpEvent.timestamp}`,
    );
    return await this.callSupportedUseCase(
      gameLevelUpEvent,
      EventType.PLAYER_LEVEL_UP,
    );
  }

  @MessagePattern(GAMING_PLAYER_ITEM_ACQUIRED_TOPIC)
  async handleItemAcquiredTopicMessage(
    @Payload() gameItemAcquiredEvent: GameItemAcquiredEvent,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${gameItemAcquiredEvent.messageId} timestamp: ${gameItemAcquiredEvent.timestamp}`,
    );
    return await this.callSupportedUseCase(
      gameItemAcquiredEvent,
      EventType.ITEM_ACQUIRED,
    );
  }
}
