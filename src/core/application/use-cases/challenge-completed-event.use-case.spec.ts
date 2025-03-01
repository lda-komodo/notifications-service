import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeCompletedEventUseCase } from './challenge-completed-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { GameChallengeCompletedEvent } from '../../domain/events/types';
import { MessageTemplates } from '../../domain/messages/message-templates';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';
import { gameChallengeCompletedEventMock, gameLevelUpEventMock } from '../../../../___MOCKS___/game-events.mocks';

describe('ChallengeCompletedEventUseCase', () => {
  let useCase: ChallengeCompletedEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeCompletedEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<ChallengeCompletedEventUseCase>(
      ChallengeCompletedEventUseCase,
    );
  });

  it(`supports should return true for ${EventType.CHALLENGE_COMPLETED} event type`, () => {
    expect(useCase.supports(EventType.CHALLENGE_COMPLETED)).toBe(true);
  });

  it('supports should return false for other event types', () => {
    expect(useCase.supports(EventType.PLAYER_LEVEL_UP)).toBe(false);
  });

  it('getMessageTemplate should return correct message template for valid event', () => {
    const expectedMessage = `What an achievement! You've completed the Kill the Dragon challenge`;
    jest.spyOn(
      MessageTemplates[EventType.CHALLENGE_COMPLETED],
      'generateMessage',
    );

    const message = useCase.getMessageTemplate(gameChallengeCompletedEventMock);

    expect(message).toBe(expectedMessage);
    expect(
      MessageTemplates[EventType.CHALLENGE_COMPLETED].generateMessage,
    ).toHaveBeenCalledWith({
      userName: gameChallengeCompletedEventMock.userId,
      challenge: gameChallengeCompletedEventMock.challenge,
    });
  });
});
