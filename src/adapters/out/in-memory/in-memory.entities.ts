import {
  NotificationPreferencesChannelNamesEnum,
  NotificationPreferencesStatusEnum,
} from '../../../core/domain/entities/notifications.enum';

export class NotificationsPreferences {
  constructor(
    public readonly userId: string,
    public readonly notificationChannel: NotificationPreferencesChannelNamesEnum,
    public readonly deliveryAddress: string,
    public readonly status: NotificationPreferencesStatusEnum,
  ) {
  }
}
