import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestAcceptedEventUseCase } from './friend-request-accepted-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { MessageTemplates } from '../../domain/messages/message-templates';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';
import { socialFriendRequestAcceptedEventEventMock } from '../../../../___MOCKS___/game-events.mocks';

describe('FriendRequestAcceptedEventUseCase', () => {
  let useCase: FriendRequestAcceptedEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendRequestAcceptedEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<FriendRequestAcceptedEventUseCase>(
      FriendRequestAcceptedEventUseCase,
    );
  });

  it(`should support ${EventType.FRIEND_REQUEST_ACCEPTED} event type`, () => {
    expect(useCase.supports(EventType.FRIEND_REQUEST_ACCEPTED)).toBe(true);
  });

  it('should not support other event types', () => {
    expect(useCase.supports(EventType.FRIEND_REQUEST_SENT)).toBe(false);
  });

  it('should generate correct message template', () => {
    const expectedMessage = `User: 10 accepted your friend request`;
    jest.spyOn(
      MessageTemplates[EventType.FRIEND_REQUEST_ACCEPTED],
      'generateMessage',
    );

    const message = useCase.getMessageTemplate(
      socialFriendRequestAcceptedEventEventMock,
    );

    expect(message).toBe(expectedMessage);
    expect(
      MessageTemplates[EventType.FRIEND_REQUEST_ACCEPTED].generateMessage,
    ).toHaveBeenCalledWith({
      userName: socialFriendRequestAcceptedEventEventMock.userId,
      fromUser: socialFriendRequestAcceptedEventEventMock.fromUserId,
    });
  });
});
