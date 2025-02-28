// adapters/in/kafka/game-event.consumer.ts
import { Controller, Inject } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import {
  GAMING_PLAYER_ITEM_ACQUIRED_TOPIC,
  GAMING_PLAYER_LEVEL_UP_TOPIC,
} from '../../../../shared/config/kafka.config';
import { BaseEventController } from './base-event.controller';
import { GameLevelUpEvent } from '../../../../core/domain/events/types';
import { ProcessLevelUpEventInterface } from '../../../../core/domain/ports/in/process-level-up-event.interface';
import { DomainModuleInjectionTokens } from '../../../../core/domain/domain.module';

@Controller()
export class GameEventController extends BaseEventController {
  constructor(
    @Inject(DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE)
    private readonly processLevelUpEventUseCase: ProcessLevelUpEventInterface,
  ) {
    super();
  }

  @MessagePattern(GAMING_PLAYER_LEVEL_UP_TOPIC)
  async handlePlayerLevelUpTopicMessage(
    @Payload() gameLevelUpEvent: GameLevelUpEvent,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    this.logger.log(`Evento recibido: ${JSON.stringify(gameLevelUpEvent)}`);
    const { timestamp } = context.getMessage();
    return await this.processLevelUpEventUseCase.processLevelUpEvent({
      ...gameLevelUpEvent,
      timestamp: timestamp,
    });
  }

  @MessagePattern(GAMING_PLAYER_ITEM_ACQUIRED_TOPIC)
  async handleItemAcquiredTopicMessage(@Payload() event: any): Promise<void> {
    this.logger.log(`Evento recibido: ${JSON.stringify(event)}`);
    // Aquí se llamaría al caso de uso
  }
}
