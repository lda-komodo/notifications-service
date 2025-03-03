import { BaseEventPayload } from '../../events/events-payloads';

export interface EventValidationServiceInterface<T extends BaseEventPayload> {
  shouldProcess(event: T): Promise<boolean>;
}
