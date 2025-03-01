import { Test, TestingModule } from '@nestjs/testing';
import { DomainModuleInjectionTokens } from '../../domain/domain.module';
import {
  MockEventValidationService,
  MockNotificationService,
} from '../../../../___MOCKS___/domain-services.mocks';
import { TestEventUseCase } from '../../../../___MOCKS___/use-cases.mocks';
import { baseEventMock } from '../../../../___MOCKS___/game-events.mocks';

describe('BaseEventUseCase', () => {
  let useCase: TestEventUseCase;
  let validationService: MockEventValidationService;
  let anotherValidationService: MockEventValidationService;
  let notificationService: MockNotificationService;

  beforeEach(async () => {
    validationService = new MockEventValidationService();
    anotherValidationService = new MockEventValidationService();
    notificationService = new MockNotificationService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestEventUseCase,
        {
          provide: DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES,
          useValue: [validationService, anotherValidationService],
        },
        {
          provide: DomainModuleInjectionTokens.NOTIFICATION_SERVICE,
          useValue: notificationService,
        },
      ],
    }).compile();

    useCase = module.get<TestEventUseCase>(TestEventUseCase);
  });

  it('should process event if validation passes', async () => {
    await useCase.processEvent(baseEventMock);

    expect(validationService.shouldProcess).toHaveBeenCalledWith(baseEventMock);
    expect(notificationService.processNotification).toHaveBeenCalledWith({
      userId: baseEventMock.userId,
      message: 'User user123 leveled up!',
    });
  });

  it('should not process event if validation fails', async () => {
    anotherValidationService.shouldProcess.mockRejectedValue(
      new Error('Validation failed'),
    );
    await useCase.processEvent(baseEventMock);

    expect(anotherValidationService.shouldProcess).toHaveBeenCalledWith(
      baseEventMock,
    );
    expect(notificationService.processNotification).not.toHaveBeenCalled();
  });

  it('callValidationsServices should return true if all validations pass', async () => {
    const result = await useCase['callValidationsServices'](baseEventMock);

    expect(result).toBe(true);
  });

  it('callValidationsServices should return false if any validation fails', async () => {
    validationService.shouldProcess.mockRejectedValue(
      new Error('Validation failed'),
    );
    const result = await useCase['callValidationsServices'](baseEventMock);

    expect(result).toBe(false);
  });

  it('callNotificationsService should call notification service with correct message', async () => {
    await useCase['callNotificationsService'](baseEventMock);

    expect(notificationService.processNotification).toHaveBeenCalledWith({
      userId: baseEventMock.userId,
      message: 'User user123 leveled up!',
    });
  });
});
