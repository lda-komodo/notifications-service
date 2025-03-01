import { Injectable } from '@nestjs/common';
import { GamePvPEvent, SocialNewFollowerEvent } from '../../domain/events/types';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class NewFollowerEventUseCase extends BaseEventUseCase<SocialNewFollowerEvent> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.NEW_FOLLOWER;
  }

  getMessageTemplate(event: SocialNewFollowerEvent): string {
    return MessageTemplates[EventType.NEW_FOLLOWER].generateMessage({
      userName: event.userId,
      fromUser: event.fromUserId,
    });
  }
}
