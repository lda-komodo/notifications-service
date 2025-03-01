import { NotificationPreferencesChannelNamesEnum } from '../../entities/notifications.enum';

export interface NotificationChannelInterface {
  notificationChannel: NotificationPreferencesChannelNamesEnum;

  send(message: string, deliveryAddress: string): Promise<void>;
}
