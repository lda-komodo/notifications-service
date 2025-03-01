import { Test, TestingModule } from '@nestjs/testing';
import { LevelUpEventUseCase } from './level-up-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { BaseEvent } from '../../domain/events/types';
import { MessageTemplates } from '../../domain/messages/message-templates';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';
import { DomainModuleInjectionTokens } from '../../domain/domain.module';
import { EventValidationServiceInterface } from '../../domain/services/interfaces/events-validation.service.interface';
import { NotificationServiceInterface } from '../../domain/services/interfaces/notifications-service.interface';
import { gameLevelUpEventMock, socialFriendRequestEventMock } from '../../../../___MOCKS___/game-events.mocks';

describe('LevelUpEventUseCase', () => {
  let useCase: LevelUpEventUseCase;
  let validationServices: EventValidationServiceInterface<BaseEvent>[];
  let notificationService: NotificationServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelUpEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<LevelUpEventUseCase>(LevelUpEventUseCase);
    validationServices = module.get(
      DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES,
    );
    notificationService = module.get<NotificationServiceInterface>(
      DomainModuleInjectionTokens.NOTIFICATION_SERVICE,
    );
  });

  it(`supports should return true for ${EventType.PLAYER_LEVEL_UP} event type`, () => {
    expect(useCase.supports(EventType.PLAYER_LEVEL_UP)).toBe(true);
  });

  it('supports should return false for other event types', () => {
    expect(useCase.supports(EventType.ITEM_ACQUIRED)).toBe(false);
  });

  it('getMessageTemplate should return correct message template for valid event', () => {
    const expectedMessage = `Congratulations 123456! You've reached level 15`;
    jest.spyOn(
      MessageTemplates[EventType.PLAYER_LEVEL_UP],
      'generateMessage',
    );

    const message = useCase.getMessageTemplate(gameLevelUpEventMock);

    expect(message).toBe(expectedMessage);
    expect(
      MessageTemplates[EventType.PLAYER_LEVEL_UP].generateMessage,
    ).toHaveBeenCalledWith({
      userName: gameLevelUpEventMock.userId,
      newLevel: gameLevelUpEventMock.newLevel,
    });
  });
});
