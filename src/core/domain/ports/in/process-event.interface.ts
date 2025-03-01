import { EventType } from '../../events/event-type.enum';
import { BaseEvent } from '../../events/types';

export interface ProcessEventInterface<T> {
  processEvent(event: T): Promise<void>;
  supports(eventType: EventType): boolean;
}
