import { EventType } from '../../events/event-type.enum';
import { BaseEventPayload } from '../../events/events-payloads';

export interface ProcessEventInterface<T extends BaseEventPayload> {
  processEvent(event: T): Promise<void>;

  supports(eventType: EventType): boolean;
}
