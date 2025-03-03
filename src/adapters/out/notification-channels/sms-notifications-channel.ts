import { NotificationChannelInterface } from '../../../core/domain/ports/out/notification-channel.interface';
import { Logger } from '@nestjs/common';
import { NotificationPreferencesChannelNamesEnum } from '../../../core/domain/entities/notifications.enum';

export class SMSNotificationsChannel implements NotificationChannelInterface<string, string> {
  notificationChannel = NotificationPreferencesChannelNamesEnum.SMS;
  protected readonly logger = new Logger(this.constructor.name);

  async send(message: string, deliveryAddress: string): Promise<void> {
    this.logger.log(`Message ${message} sent to ${deliveryAddress}`);
    return Promise.resolve(undefined);
  }
}
