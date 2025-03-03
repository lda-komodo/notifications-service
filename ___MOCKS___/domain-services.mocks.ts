import {
  EventValidationServiceInterface
} from '../src/core/domain/services/interfaces/events-validation.service.interface';
import { BaseEventPayload } from '../src/core/domain/events/events-payloads';
import { NotificationServiceInterface } from '../src/core/domain/services/interfaces/notifications-service.interface';

export class MockEventValidationService implements EventValidationServiceInterface<BaseEventPayload> {
  shouldProcess = jest.fn().mockResolvedValue(true);
}

export class MockNotificationService implements NotificationServiceInterface {
  processNotification = jest.fn().mockResolvedValue(undefined);
}