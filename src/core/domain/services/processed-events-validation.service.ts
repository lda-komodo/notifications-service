import { Inject, Injectable } from '@nestjs/common';
import { ProcessedEventsRepositoryInterface } from '../ports/out/processed-events.repository.interface';
import { EventValidationServiceInterface } from '../ports/out/events-validation.service.interface';
import { BaseEvent } from '../events/types';
import { OutAdapterModuleInjectionTokens } from '../../../adapters/out/out.module';
import { BusinessException } from '../exceptions/business.exception';

@Injectable()
export class ProcessedEventsValidationService
  implements EventValidationServiceInterface<BaseEvent> {
  constructor(
    @Inject(OutAdapterModuleInjectionTokens.PROCESSED_EVENTS_REPOSITORY)
    private readonly processedEventsRepository: ProcessedEventsRepositoryInterface,
  ) {
  }

  async shouldProcess(eventContext: BaseEvent): Promise<boolean> {
    if (await this.processedEventsRepository.exists(eventContext.messageId)) {
      throw new BusinessException(
        `Event ${eventContext.messageId} already processed, ignoring...`,
      );
    }
    await this.processedEventsRepository.save(eventContext.messageId, 360);
    return true;
  }
}
