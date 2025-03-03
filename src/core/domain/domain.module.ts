import { Module } from '@nestjs/common';
import { ProcessedEventsValidationService } from './services/processed-events-validation.service';
import { NotificationService } from './services/notifications.service';
import { OutAdaptersModule } from '../../adapters/out/out-adapters.module';

export enum DomainModuleInjectionTokens {
  PROCESS_LEVEL_UP_EVENT_INTERFACE = 'PROCESS_LEVEL_UP_EVENT_INTERFACE',
  EVENTS_VALIDATION_SERVICES = 'EVENTS_VALIDATION_SERVICES',
  NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE',
  EVENT_PROCESSORS = 'EVENT_PROCESSORS',
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
export class DomainModule {}
