import { NotificationPreferencesRepositoryInterface } from '../../../core/domain/ports/out/notification-preferences.repository.interface';
import { NotificationsPreferences } from '../../../core/domain/entities/notifications-preferences.entity';
import { NotificationsPreferencesRecords } from './in-memory-records';

export class InMemoryNotificationsPreferencesRepository
  implements NotificationPreferencesRepositoryInterface
{
  async findByUserId(userId: string): Promise<NotificationsPreferences[]> {
    return NotificationsPreferencesRecords[userId];
  }
}
