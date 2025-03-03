import { Controller, Inject, Logger } from '@nestjs/common';
import { BaseEventPayload } from '../../../../core/domain/events/events-payloads';
import { EventType } from '../../../../core/domain/events/event-type.enum';
import { DomainModuleInjectionTokens } from '../../../../core/domain/domain.module';
import { ProcessEventInterface } from '../../../../core/domain/ports/in/process-event.interface';

@Controller('base-event.controller')
export abstract class BaseEventController {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DomainModuleInjectionTokens.EVENT_PROCESSORS)
    protected readonly eventUseCaseProcessors: ProcessEventInterface<BaseEventPayload>[],
  ) {}

  protected async callSupportedUseCase(
    gameLevelUpEvent: BaseEventPayload,
    eventYpe: EventType,
  ): Promise<void> {
    this.logger.debug(`Looking for a processor: ${JSON.stringify(gameLevelUpEvent)}`);
    const processor = this.eventUseCaseProcessors.find((p) =>
      p.supports(eventYpe),
    );
    if (!processor) {
      this.logger.error(`No processor found for event type: ${eventYpe}`);
      return;
    }
    return await processor.processEvent(gameLevelUpEvent);
  }
}
