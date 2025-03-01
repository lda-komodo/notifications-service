import { NotificationChannelInterface } from '../../../core/domain/ports/out/notification-channel.interface';
import { Logger } from '@nestjs/common';
import { NotificationPreferencesChannelNamesEnum } from '../../../core/domain/entities/notifications.enum';

export class PushNotificationsChannel implements NotificationChannelInterface {
  notificationChannel = NotificationPreferencesChannelNamesEnum.PUSH;
  protected readonly logger = new Logger(this.constructor.name);

  async send(message: string, deliveryAddress: string): Promise<void> {
    this.logger.log(`Message ${message} sent`);
    return Promise.resolve(undefined);
  }
}
