import { Inject, Injectable } from '@nestjs/common';
import { ProcessedEventsRepositoryInterface } from '../ports/out/processed-events.repository.interface';
import { EventValidationServiceInterface } from './interfaces/events-validation.service.interface';
import { BaseEventPayload } from '../events/events-payloads';
import { OutAdapterModuleInjectionTokens } from '../../../adapters/out/out-adapters.module';
import { BusinessException } from '../exceptions/business.exception';

@Injectable()
export class ProcessedEventsValidationService
  implements EventValidationServiceInterface<BaseEventPayload>
{
  constructor(
    @Inject(OutAdapterModuleInjectionTokens.PROCESSED_EVENTS_REPOSITORY)
    private readonly processedEventsRepository: ProcessedEventsRepositoryInterface,
  ) {}

  async shouldProcess(event: BaseEventPayload): Promise<boolean> {
    if (await this.processedEventsRepository.exists(event.messageId)) {
      throw new BusinessException(
        `Event ${event.messageId} already processed, ignoring...`,
      );
    }
    await this.processedEventsRepository.save(event.messageId, 360);
    return true;
  }
}
