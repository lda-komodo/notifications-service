import { NotificationPreferencesChannelNamesEnum } from '../../entities/notifications.enum';

export interface NotificationChannelInterface<T, K> {
  notificationChannel: NotificationPreferencesChannelNamesEnum;

  send(message: T, deliveryAddress: K): Promise<void>;
}
