import { Injectable } from '@nestjs/common';
import { GameLevelUpEventPayload } from '../../domain/events/events-payloads';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class LevelUpEventUseCase extends BaseEventUseCase<GameLevelUpEventPayload> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.PLAYER_LEVEL_UP;
  }

  getMessageTemplate(event: GameLevelUpEventPayload): string {
    return MessageTemplates[EventType.PLAYER_LEVEL_UP].generateMessage({
      userName: event.userId,
      newLevel: event.newLevel,
    });
  }
}
