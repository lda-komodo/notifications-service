import { Test, TestingModule } from '@nestjs/testing';
import { BaseEvent } from '../../../../core/domain/events/types';
import { DomainModuleInjectionTokens } from '../../../../core/domain/domain.module';
import { ProcessEventInterface } from '../../../../core/domain/ports/in/process-event.interface';
import { SocialEventController } from './social-event.controller';
import { controllersProviders } from '../../../../../___MOCKS___/providers.mocks';
import {
  socialFriendRequestAcceptedEventEventMock,
  socialFriendRequestEventMock,
  socialNewFollowerEventMock,
} from '../../../../../___MOCKS___/game-events.mocks';
import {
  SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC,
  SOCIAL_FRIEND_REQUEST_TOPIC,
  SOCIAL_NEW_FOLLOWER_TOPIC,
} from '../../../../shared/config/kafka.config';

describe('GameEventConsumer', () => {
  let socialEventController: SocialEventController;
  let useCases: ProcessEventInterface<BaseEvent>[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialEventController, controllersProviders()],
    }).compile();

    socialEventController = module.get<SocialEventController>(
      SocialEventController,
    );
    useCases = module.get(DomainModuleInjectionTokens.EVENT_PROCESSORS);
  });

  it('should be defined', () => {
    expect(socialEventController).toBeDefined();
  });

  it(`should fail to call a use-case when there is no processor that supports the received events`, async () => {
    jest.spyOn(useCases[0], 'supports').mockReturnValue(false);
    await socialEventController.handleNewFollowerTopicMessage(
      socialNewFollowerEventMock,
    );

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(0);
    expect(useCases[1].processEvent).toHaveBeenCalledTimes(0);
  });

  it(`should call to use-case with received events from "${SOCIAL_NEW_FOLLOWER_TOPIC}" topic`, async () => {
    jest.spyOn(useCases[0], 'processEvent');
    await socialEventController.handleNewFollowerTopicMessage(
      socialNewFollowerEventMock,
    );

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(1);
    expect(useCases[0].processEvent).toHaveBeenCalledWith(
      socialNewFollowerEventMock,
    );
  });

  it(`should call to use-case with received events from "${SOCIAL_FRIEND_REQUEST_TOPIC}" topic`, async () => {
    jest.spyOn(useCases[0], 'processEvent');
    await socialEventController.handleFriendRequestTopicMessage(
      socialFriendRequestEventMock,
    );

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(1);
    expect(useCases[0].processEvent).toHaveBeenCalledWith(
      socialFriendRequestEventMock,
    );

    expect(useCases[1].processEvent).toHaveBeenCalledTimes(0);
  });

  it(`should call to use-case with received events from "${SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC}" topic`, async () => {
    jest.spyOn(useCases[0], 'processEvent');
    await socialEventController.handleFriendRequestAcceptedTopicMessage(
      socialFriendRequestAcceptedEventEventMock,
    );

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(1);
    expect(useCases[0].processEvent).toHaveBeenCalledWith(
      socialFriendRequestAcceptedEventEventMock,
    );

    expect(useCases[1].processEvent).toHaveBeenCalledTimes(0);
  });
});
