import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { RedisProcessedEventsRepository } from './redis/redis-processed-events.repository';
import { SMSNotificationsChannel } from './notification-channels/sms-notifications-channel';
import { EmailNotificationsChannel } from './notification-channels/email-notifications-channel';
import { PushNotificationsChannel } from './notification-channels/push-notifications-channel';

export enum OutAdapterModuleInjectionTokens {
  PROCESSED_EVENTS_REPOSITORY = 'PROCESSED_EVENTS_REPOSITORY',
  NOTIFICATION_CHANNELS = 'NOTIFICATION_CHANNELS',
}

@Module({
  imports: [InfrastructureModule],
  providers: [
    SMSNotificationsChannel,
    EmailNotificationsChannel,
    PushNotificationsChannel,
    {
      provide: OutAdapterModuleInjectionTokens.PROCESSED_EVENTS_REPOSITORY,
      useClass: RedisProcessedEventsRepository,
    },
    {
      provide: OutAdapterModuleInjectionTokens.NOTIFICATION_CHANNELS,
      useFactory: (
        sms: SMSNotificationsChannel,
        email: EmailNotificationsChannel,
        push: PushNotificationsChannel,
      ) => [sms, email, push],
      inject: [
        SMSNotificationsChannel,
        EmailNotificationsChannel,
        PushNotificationsChannel,
      ],
    },
  ],
  exports: [
    OutAdapterModuleInjectionTokens.PROCESSED_EVENTS_REPOSITORY,
    OutAdapterModuleInjectionTokens.NOTIFICATION_CHANNELS,
  ],
})
export class OutAdaptersModule {
}
