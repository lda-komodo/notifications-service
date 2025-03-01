import { NotificationPreferencesChannelNamesEnum, NotificationPreferencesStatusEnum } from './notifications.enum';

export interface NotificationsPreferences {
  userId: string;
  notificationChannel: NotificationPreferencesChannelNamesEnum;
  deliveryAddress: string;
  status: NotificationPreferencesStatusEnum;
}
