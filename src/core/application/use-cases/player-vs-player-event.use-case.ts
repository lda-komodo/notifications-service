import { Injectable } from '@nestjs/common';
import { GamePvPEventPayload } from '../../domain/events/events-payloads';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class PlayerVsPlayerEventUseCase extends BaseEventUseCase<GamePvPEventPayload> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.PVP;
  }

  getMessageTemplate(event: GamePvPEventPayload): string {
    return MessageTemplates[EventType.PVP].generateMessage({
      userName: event.userId,
      vsUser: event.vsUserId,
    });
  }
}
