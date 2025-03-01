import { Test, TestingModule } from '@nestjs/testing';
import { LevelUpEventUseCase } from './level-up-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { MessageTemplates } from '../../domain/messages/message-templates';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';
import { gameLevelUpEventMock } from '../../../../___MOCKS___/game-events.mocks';

describe('LevelUpEventUseCase', () => {
  let useCase: LevelUpEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelUpEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<LevelUpEventUseCase>(LevelUpEventUseCase);
  });

  it(`supports should return true for ${EventType.PLAYER_LEVEL_UP} event type`, () => {
    expect(useCase.supports(EventType.PLAYER_LEVEL_UP)).toBe(true);
  });

  it('supports should return false for other event types', () => {
    expect(useCase.supports(EventType.ITEM_ACQUIRED)).toBe(false);
  });

  it('getMessageTemplate should return correct message template for valid event', () => {
    const expectedMessage = `Congratulations 123456! You've reached level 15`;
    jest.spyOn(MessageTemplates[EventType.PLAYER_LEVEL_UP], 'generateMessage');

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
