import { Injectable } from '@nestjs/common';
import { GameChallengeCompletedEvent } from '../../domain/events/types';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class ChallengeCompletedEventUseCase extends BaseEventUseCase<GameChallengeCompletedEvent> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.CHALLENGE_COMPLETED;
  }

  getMessageTemplate(event: GameChallengeCompletedEvent): string {
    return MessageTemplates[EventType.CHALLENGE_COMPLETED].generateMessage({
      userName: event.userId,
      challenge: event.challenge,
    });
  }
}
