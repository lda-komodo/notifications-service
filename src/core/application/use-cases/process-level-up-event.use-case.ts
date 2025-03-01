import { Inject, Injectable, Logger } from '@nestjs/common';
import { GameLevelUpEvent } from '../../domain/events/types';
import { ProcessEventInterface } from '../../domain/ports/in/process-event.interface';
import { EventValidationServiceInterface } from '../../domain/services/interfaces/events-validation.service.interface';
import { DomainModuleInjectionTokens } from '../../domain/domain.module';
import { NotificationServiceInterface } from '../../domain/services/interfaces/notifications-service.interface';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { EventType } from '../../domain/events/event-type.enum';

@Injectable()
export class ProcessLevelUpEventUseCase
  implements ProcessEventInterface<GameLevelUpEvent> {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES)
    private readonly eventsValidationsServices: EventValidationServiceInterface<GameLevelUpEvent>[],
    @Inject(DomainModuleInjectionTokens.NOTIFICATION_SERVICE)
    private readonly notificationService: NotificationServiceInterface,
  ) {
  }

  supports(eventType: EventType): boolean {
    return eventType === EventType.PLAYER_LEVEL_UP;
  }

  async processEvent(event: GameLevelUpEvent): Promise<void> {
    if (!(await this.callValidationsServices(event))) {
      return;
    }

    await this.callNotificationsService(event);

    this.logger.log(`Event ${event.messageId} processed`);

    return;
  }

  private async callValidationsServices(
    gameLevelUpEvent: GameLevelUpEvent,
  ): Promise<boolean> {
    const validationsResults = await Promise.allSettled(
      this.eventsValidationsServices.map(async (validationService) => {
        await validationService.shouldProcess(gameLevelUpEvent);
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

  private async callNotificationsService(
    gameLevelUpEvent: GameLevelUpEvent,
  ): Promise<void> {
    const template = MessageTemplates[EventType.PLAYER_LEVEL_UP];
    const message = template.generateMessage({
      userName: gameLevelUpEvent.userId,
      newLevel: gameLevelUpEvent.newLevel.toString(),
    });

    await this.notificationService.processNotification({
      userId: gameLevelUpEvent.userId,
      message: message,
    });
  }
}
