import { Injectable } from '@nestjs/common';
import { BaseSocialEventPayload } from '../../domain/events/events-payloads';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class FriendRequestEventUseCase extends BaseEventUseCase<BaseSocialEventPayload> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.FRIEND_REQUEST_SENT;
  }

  getMessageTemplate(event: BaseSocialEventPayload): string {
    return MessageTemplates[EventType.FRIEND_REQUEST_SENT].generateMessage({
      userName: event.userId,
      fromUser: event.fromUserId,
    });
  }
}
