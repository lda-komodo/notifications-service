import { BaseEventUseCase } from '../src/core/application/use-cases/base-event.use-case';
import { BaseEventPayload } from '../src/core/domain/events/events-payloads';
import { EventType } from '../src/core/domain/events/event-type.enum';

export class TestEventUseCase extends BaseEventUseCase<BaseEventPayload> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.PLAYER_LEVEL_UP;
  }

  getMessageTemplate(event: BaseEventPayload): string {
    return `User ${event.userId} leveled up!`;
  }
}
