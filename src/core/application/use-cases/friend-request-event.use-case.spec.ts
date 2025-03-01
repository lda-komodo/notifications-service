import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestEventUseCase } from './friend-request-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { socialFriendRequestEventMock } from '../../../../___MOCKS___/game-events.mocks';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';

describe('FriendRequestEventUseCase', () => {
  let useCase: FriendRequestEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendRequestEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<FriendRequestEventUseCase>(FriendRequestEventUseCase);
  });

  it('should support FRIEND_REQUEST_SENT event type', () => {
    expect(useCase.supports(EventType.FRIEND_REQUEST_SENT)).toBe(true);
  });

  it('should not support other event types', () => {
    expect(useCase.supports(EventType.FRIEND_REQUEST_ACCEPTED)).toBe(false);
  });

  it('should generate correct message template', () => {
    const expectedMessage = `User: 10 has sent you a friend request`;
    jest.spyOn(
      MessageTemplates[EventType.FRIEND_REQUEST_SENT],
      'generateMessage',
    );

    const message = useCase.getMessageTemplate(socialFriendRequestEventMock);

    expect(message).toBe(expectedMessage);
    expect(
      MessageTemplates[EventType.FRIEND_REQUEST_SENT].generateMessage,
    ).toHaveBeenCalledWith({
      userName: socialFriendRequestEventMock.userId,
      fromUser: socialFriendRequestEventMock.fromUserId,
    });
  });
});
