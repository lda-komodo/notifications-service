import { NotificationsPreferences } from '../../entities/notifications-preferences.entity';

export interface NotificationPreferencesRepositoryInterface {
  findByUserId(userId: string): Promise<NotificationsPreferences[]>;
}
