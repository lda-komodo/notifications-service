import { Inject, Injectable, Logger } from '@nestjs/common';
import { ProcessEventInterface } from '../../domain/ports/in/process-event.interface';
import { EventValidationServiceInterface } from '../../domain/services/interfaces/events-validation.service.interface';
import { DomainModuleInjectionTokens } from '../../domain/domain.module';
import { NotificationServiceInterface } from '../../domain/services/interfaces/notifications-service.interface';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEvent } from '../../domain/events/types';

@Injectable()
export abstract class BaseEventUseCase<T extends BaseEvent>
  implements ProcessEventInterface<T>
{
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES)
    private readonly eventsValidationsServices: EventValidationServiceInterface<T>[],
    @Inject(DomainModuleInjectionTokens.NOTIFICATION_SERVICE)
    private readonly notificationService: NotificationServiceInterface,
  ) {}

  abstract supports(eventType: EventType): boolean;

  abstract getMessageTemplate(event: T): string;

  async processEvent(event: T): Promise<void> {
    if (!(await this.callValidationsServices(event))) {
      return;
    }
    await this.callNotificationsService(event);
    this.logger.log(`Event ${event.messageId} processed`);
  }

  private async callValidationsServices(event: T): Promise<boolean> {
    const validationsResults = await Promise.allSettled(
      this.eventsValidationsServices.map(async (validationService) => {
        await validationService.shouldProcess(event);
      }),
    );

    const errors = validationsResults
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);

    if (errors.length > 0) {
      this.logger.warn(`Validations errors: ${errors.join(', ')}`);
      return false;
    }
    return true;
  }

  private async callNotificationsService(event: T): Promise<void> {
    const message = this.getMessageTemplate(event);
    await this.notificationService.processNotification({
      userId: event.userId,
      message: message,
    });
  }
}
