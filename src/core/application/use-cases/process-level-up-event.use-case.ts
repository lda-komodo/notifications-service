import { Inject, Injectable, Logger } from '@nestjs/common';
import { GameLevelUpEvent } from '../../domain/events/types';
import { NotificationService } from '../../domain/services/notifications-preferences.service';
import { ProcessLevelUpEventInterface } from '../../domain/ports/in/process-level-up-event.interface';
import { EventValidationServiceInterface } from '../../domain/ports/out/events-validation.service.interface';
import { DomainModuleInjectionTokens } from '../../domain/domain.module';

@Injectable()
export class ProcessLevelUpEventUseCase
  implements ProcessLevelUpEventInterface {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES)
    private readonly eventsValidationsServices: EventValidationServiceInterface<GameLevelUpEvent>[],
    @Inject(DomainModuleInjectionTokens.NOTIFICATION_SERVICE)
    private readonly notificationService: NotificationService,
  ) {
  }

  async processLevelUpEvent(gameLevelUpEvent: GameLevelUpEvent): Promise<void> {
    const validationsResults = await Promise.allSettled(
      this.eventsValidationsServices.map(async (validationService) => {
        await validationService.shouldProcess(gameLevelUpEvent);
      }),
    );

    const errors = validationsResults
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);

    if (errors.length > 0) {
      this.logger.warn(`Errores de validación: ${errors.join(', ')}`);
      return;
    }

    await this.notificationService.sendNotification(
      gameLevelUpEvent.userId,
      'Aqui va el mensaje',
    );

    Logger.log(`Evento ${gameLevelUpEvent.messageId} procesado`);
    return Promise.resolve(undefined);
  }
}
