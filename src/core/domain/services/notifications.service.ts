import { Inject, Injectable, Logger } from '@nestjs/common';
import { NotificationServiceInterface } from './interfaces/notifications-service.interface';
import { OutAdapterModuleInjectionTokens } from '../../../adapters/out/out-adapters.module';
import { NotificationChannelInterface } from '../ports/out/notification-channel.interface';
import { NotificationPreferencesRepositoryInterface } from '../ports/out/notification-preferences.repository.interface';
import { NotificationPreferencesStatusEnum } from '../entities/notifications.enum';

@Injectable()
export class NotificationService implements NotificationServiceInterface {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(OutAdapterModuleInjectionTokens.NOTIFICATION_CHANNELS)
    private readonly notificationsChannels: NotificationChannelInterface<string, string>[],
    @Inject(
      OutAdapterModuleInjectionTokens.NOTIFICATIONS_PREFERENCES_REPOSITORY,
    )
    private readonly notificationsPreferencesRepository: NotificationPreferencesRepositoryInterface,
  ) {}

  async processNotification(notification: {
    userId: string;
    message: string;
  }): Promise<void> {
    const notificationsPreferences =
      await this.notificationsPreferencesRepository.findByUserId(
        notification.userId,
      );

    if (!notificationsPreferences) {
      this.logger.error(
        `User ${notification.userId} does not have notifications preferences!`,
      );
      return;
    }

    const result = await Promise.allSettled(
      this.notificationsChannels.map(async (channel) => {
        const preference = notificationsPreferences.find(
          (preference) =>
            preference.notificationChannel === channel.notificationChannel &&
            preference.status === NotificationPreferencesStatusEnum.ACTIVE,
        );

        if (preference) {
          await channel.send(notification.message, preference.deliveryAddress);
        }
      }),
    );

    const errors = result
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);

    if (errors.length > 0) {
      this.logger.warn(`Message channel errors: ${errors.join(', ')}`);
    }
  }
}
