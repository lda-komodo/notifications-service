import { Test, TestingModule } from '@nestjs/testing';
import { PlayerVsPlayerEventUseCase } from './player-vs-player-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { gamePvPEventMock } from '../../../../___MOCKS___/game-events.mocks';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';

describe('PlayerVsPlayerEventUseCase', () => {
  let useCase: PlayerVsPlayerEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerVsPlayerEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<PlayerVsPlayerEventUseCase>(
      PlayerVsPlayerEventUseCase,
    );
  });

  it('should support PVP event type', () => {
    expect(useCase.supports(EventType.PVP)).toBe(true);
  });

  it('should not support other event types', () => {
    expect(useCase.supports(EventType.FRIEND_REQUEST_ACCEPTED)).toBe(false);
  });

  it('should generate correct message template', () => {
    const expectedMessage = `You've been defeated by user: 8`;

    jest.spyOn(MessageTemplates[EventType.PVP], 'generateMessage');

    const message = useCase.getMessageTemplate(gamePvPEventMock);

    expect(message).toBe(expectedMessage);
    expect(
      MessageTemplates[EventType.PVP].generateMessage,
    ).toHaveBeenCalledWith({
      userName: gamePvPEventMock.userId,
      vsUser: gamePvPEventMock.vsUser,
    });
  });
});
