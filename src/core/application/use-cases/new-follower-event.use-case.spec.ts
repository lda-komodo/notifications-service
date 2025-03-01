import { Test, TestingModule } from '@nestjs/testing';
import { NewFollowerEventUseCase } from './new-follower-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { socialNewFollowerEventMock } from '../../../../___MOCKS___/game-events.mocks';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';

describe('NewFollowerEventUseCase', () => {
  let useCase: NewFollowerEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewFollowerEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<NewFollowerEventUseCase>(NewFollowerEventUseCase);
  });

  it('should support NEW_FOLLOWER event type', () => {
    expect(useCase.supports(EventType.NEW_FOLLOWER)).toBe(true);
  });

  it('should not support other event types', () => {
    expect(useCase.supports(EventType.FRIEND_REQUEST_ACCEPTED)).toBe(false);
  });

  it('should generate correct message template', () => {
    const expectedMessage = `User: 10 now follows you`;

    jest.spyOn(MessageTemplates[EventType.NEW_FOLLOWER], 'generateMessage');

    const message = useCase.getMessageTemplate(socialNewFollowerEventMock);

    expect(message).toBe(expectedMessage);
    expect(
      MessageTemplates[EventType.NEW_FOLLOWER].generateMessage,
    ).toHaveBeenCalledWith({
      userName: socialNewFollowerEventMock.userId,
      fromUser: socialNewFollowerEventMock.fromUserId,
    });
  });
});
