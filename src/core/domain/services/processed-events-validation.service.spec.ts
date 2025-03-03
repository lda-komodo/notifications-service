import { Test, TestingModule } from '@nestjs/testing';
import { ProcessedEventsValidationService } from './processed-events-validation.service';
import { OutAdapterModuleInjectionTokens } from '../../../adapters/out/out-adapters.module';
import { BusinessException } from '../exceptions/business.exception';
import { baseEventMock } from '../../../../___MOCKS___/game-events.mocks';
import { MockProcessedEventsRepository } from '../../../../___MOCKS___/adapters.mocks';

describe('ProcessedEventsValidationService', () => {
  let service: ProcessedEventsValidationService;
  let repository: MockProcessedEventsRepository;

  beforeEach(async () => {
    repository = new MockProcessedEventsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessedEventsValidationService,
        {
          provide: OutAdapterModuleInjectionTokens.PROCESSED_EVENTS_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ProcessedEventsValidationService>(
      ProcessedEventsValidationService,
    );
  });

  it('should return true if event has not been processed', async () => {
    repository.exists.mockResolvedValue(false);

    const result = await service.shouldProcess(baseEventMock);

    expect(result).toBe(true);
    expect(repository.exists).toHaveBeenCalledWith(baseEventMock.messageId);
    expect(repository.save).toHaveBeenCalledWith(baseEventMock.messageId, 360);
  });

  it('should throw BusinessException if event has already been processed', async () => {
    repository.exists.mockResolvedValue(true);

    await expect(service.shouldProcess(baseEventMock)).rejects.toThrow(
      BusinessException,
    );

    expect(repository.exists).toHaveBeenCalledWith(baseEventMock.messageId);
    expect(repository.save).not.toHaveBeenCalled();
  });
});
