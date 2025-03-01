import { EventType } from '../../events/event-type.enum';

export interface ProcessEventInterface<T> {
  processEvent(event: T): Promise<void>;

  supports(eventType: EventType): boolean;
}
