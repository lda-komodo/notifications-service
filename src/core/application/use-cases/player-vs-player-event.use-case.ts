import { Injectable } from '@nestjs/common';
import { GameLevelUpEvent, GamePvPEvent } from '../../domain/events/types';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class PlayerVsPlayerEventUseCase extends BaseEventUseCase<GamePvPEvent> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.PVP;
  }

  getMessageTemplate(event: GamePvPEvent): string {
    return MessageTemplates[EventType.PVP].generateMessage({
      userName: event.userId,
      vsUser: event.vsUser,
    });
  }
}
