import { Injectable } from '@nestjs/common';
import { GameLevelUpEvent } from '../../domain/events/types';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class LevelUpEventUseCase extends BaseEventUseCase<GameLevelUpEvent> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.PLAYER_LEVEL_UP;
  }

  getMessageTemplate(event: GameLevelUpEvent): string {
    return MessageTemplates[EventType.PLAYER_LEVEL_UP].generateMessage({
      userName: event.userId,
      newLevel: event.newLevel.toString(),
    });
  }
}
