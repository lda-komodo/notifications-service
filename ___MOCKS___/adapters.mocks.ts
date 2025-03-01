import { ProcessedEventsRepositoryInterface } from '../src/core/domain/ports/out/processed-events.repository.interface';
import { NotificationChannelInterface } from '../src/core/domain/ports/out/notification-channel.interface';
import { NotificationPreferencesChannelNamesEnum } from '../src/core/domain/entities/notifications.enum';
import {
  NotificationPreferencesRepositoryInterface
} from '../src/core/domain/ports/out/notification-preferences.repository.interface';

export class MockProcessedEventsRepository implements ProcessedEventsRepositoryInterface {
  exists = jest.fn();
  save = jest.fn();
}

export class MockEmailNotificationChannel implements NotificationChannelInterface {
  notificationChannel = NotificationPreferencesChannelNamesEnum.EMAIL;
  send = jest.fn().mockResolvedValue(undefined);
}

export class MockNotificationPreferencesRepository implements NotificationPreferencesRepositoryInterface {
  findByUserId = jest.fn();
}