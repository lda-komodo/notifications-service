import { InMemoryNotificationsPreferencesRepository } from './in-memory-notifications-preferences.repository';
import { NotificationsPreferencesRecords } from './in-memory-records';
import {
  NotificationPreferencesChannelNamesEnum,
  NotificationPreferencesStatusEnum,
} from '../../../core/domain/entities/notifications.enum';

describe('InMemoryNotificationsPreferencesRepository', () => {
  let repository: InMemoryNotificationsPreferencesRepository;

  beforeEach(() => {
    repository = new InMemoryNotificationsPreferencesRepository();
  });

  it('should return preferences for a given userId', async () => {
    const userId = 'user123';
    const preferences = [
      {
        userId: 'user123',
        notificationChannel: NotificationPreferencesChannelNamesEnum.EMAIL,
        status: NotificationPreferencesStatusEnum.ACTIVE,
        deliveryAddress: 'user@example.com',
      },
    ];
    NotificationsPreferencesRecords[userId] = preferences;

    const result = await repository.findByUserId(userId);

    expect(result).toEqual(preferences);
  });

  it('should return undefined if no preferences found for a given userId', async () => {
    const userId = 'nonexistentUser';

    const result = await repository.findByUserId(userId);

    expect(result).toBeUndefined();
  });
});
