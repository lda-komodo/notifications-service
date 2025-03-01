import { Controller, Inject, Logger } from '@nestjs/common';
import { BaseEvent } from '../../../../core/domain/events/types';
import { EventType } from '../../../../core/domain/events/event-type.enum';
import { DomainModuleInjectionTokens } from '../../../../core/domain/domain.module';
import { ProcessEventInterface } from '../../../../core/domain/ports/in/process-event.interface';

@Controller('base-event.controller')
export abstract class BaseEventController {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DomainModuleInjectionTokens.EVENT_PROCESSORS)
    protected readonly eventUseCaseProcessors: ProcessEventInterface<BaseEvent>[],
  ) {
  }

  protected async callSupportedUseCase(
    gameLevelUpEvent: BaseEvent,
    eventYpe: EventType,
  ): Promise<void> {
    const processor = this.eventUseCaseProcessors.find((p) =>
      p.supports(eventYpe),
    );
    if (!processor) {
      this.logger.error(
        `No processor found for event type: ${eventYpe}`,
      );
      return;
    }
    return await processor.processEvent(gameLevelUpEvent);
  }
}
