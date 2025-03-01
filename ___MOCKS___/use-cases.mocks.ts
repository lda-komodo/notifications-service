import { BaseEventUseCase } from '../src/core/application/use-cases/base-event.use-case';
import { BaseEvent } from '../src/core/domain/events/types';
import { EventType } from '../src/core/domain/events/event-type.enum';

export class TestEventUseCase extends BaseEventUseCase<BaseEvent> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.PLAYER_LEVEL_UP;
  }

  getMessageTemplate(event: BaseEvent): string {
    return `User ${event.userId} leveled up!`;
  }
}
