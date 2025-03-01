import {
  EventValidationServiceInterface
} from '../src/core/domain/services/interfaces/events-validation.service.interface';
import { BaseEvent } from '../src/core/domain/events/types';
import { NotificationServiceInterface } from '../src/core/domain/services/interfaces/notifications-service.interface';

export class MockEventValidationService implements EventValidationServiceInterface<BaseEvent> {
  shouldProcess = jest.fn().mockResolvedValue(true);
}

export class MockNotificationService implements NotificationServiceInterface {
  processNotification = jest.fn().mockResolvedValue(undefined);
}