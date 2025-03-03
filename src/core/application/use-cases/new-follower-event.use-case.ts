import { Injectable } from '@nestjs/common';
import { BaseSocialEventPayload } from '../../domain/events/events-payloads';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class NewFollowerEventUseCase extends BaseEventUseCase<BaseSocialEventPayload> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.NEW_FOLLOWER;
  }

  getMessageTemplate(event: BaseSocialEventPayload): string {
    return MessageTemplates[EventType.NEW_FOLLOWER].generateMessage({
      userName: event.userId,
      fromUser: event.fromUserId,
    });
  }
}
