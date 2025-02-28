import { Module } from '@nestjs/common';
import { ProcessedEventsValidationService } from './services/processed-events-validation.service';
import { NotificationService } from './services/notifications-preferences.service';
import { OutAdaptersModule } from '../../adapters/out/out.module';

export enum DomainModuleInjectionTokens {
  USERS_NOTIFICATIONS_REPOSITORY = 'USERS_NOTIFICATIONS_REPOSITORY',
  PROCESSED_EVENTS_REPOSITORY = 'PROCESSED_EVENTS_REPOSITORY',
  PROCESS_LEVEL_UP_EVENT_INTERFACE = 'PROCESS_LEVEL_UP_EVENT_INTERFACE',
  EVENTS_VALIDATION_SERVICES = 'EVENTS_VALIDATION_SERVICES',
  NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE',
}

@Module({
  imports: [OutAdaptersModule],
  providers: [
    ProcessedEventsValidationService,
    {
      provide: DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES,
      useFactory: (
        processedEventsValidationService: ProcessedEventsValidationService,
      ) => [processedEventsValidationService],
      inject: [ProcessedEventsValidationService],
    },
    {
      provide: DomainModuleInjectionTokens.NOTIFICATION_SERVICE,
      useClass: NotificationService,
    },
  ],
  exports: [
    DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES,
    DomainModuleInjectionTokens.NOTIFICATION_SERVICE,
  ],
})
export class DomainModule {
}
