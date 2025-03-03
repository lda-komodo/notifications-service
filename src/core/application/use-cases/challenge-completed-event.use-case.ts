import { Injectable } from '@nestjs/common';
import { GameChallengeCompletedEventPayload } from '../../domain/events/events-payloads';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class ChallengeCompletedEventUseCase extends BaseEventUseCase<GameChallengeCompletedEventPayload> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.CHALLENGE_COMPLETED;
  }

  getMessageTemplate(event: GameChallengeCompletedEventPayload): string {
    return MessageTemplates[EventType.CHALLENGE_COMPLETED].generateMessage({
      userName: event.userId,
      challenge: event.challenge,
    });
  }
}
