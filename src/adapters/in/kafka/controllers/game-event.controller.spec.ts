import { Test, TestingModule } from '@nestjs/testing';
import { GameEventController } from './game-event.controller';
import { ClientKafka } from '@nestjs/microservices';
import {
  GAMING_CHALLENGE_COMPLETED_TOPIC,
  GAMING_PLAYER_ITEM_ACQUIRED_TOPIC,
  GAMING_PLAYER_LEVEL_UP_TOPIC, GAMING_PVP_TOPIC,
} from '../../../../shared/config/kafka.config';
import { BaseEvent } from '../../../../core/domain/events/types';
import { DomainModuleInjectionTokens } from '../../../../core/domain/domain.module';
import { ProcessEventInterface } from '../../../../core/domain/ports/in/process-event.interface';
import {
  gameChallengeCompletedEventMock,
  gameItemAcquiredEventMock,
  gameLevelUpEventMock, gamePvPEventMock,
} from '../../../../../___MOCKS___/game-events.mocks';
import { domainProviders } from '../../../../../___MOCKS___/providers.mocks';

describe('GameEventConsumer', () => {
  let consumer: GameEventController;
  let useCases: ProcessEventInterface<BaseEvent>[];

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameEventController,
        domainProviders(),
      ],
    }).compile();

    consumer = module.get<GameEventController>(GameEventController);
    useCases = module.get(DomainModuleInjectionTokens.EVENT_PROCESSORS);
  });

  it('should be defined', () => {
    expect(consumer).toBeDefined();
  });

  it(`should fail to call a use-case when there is no processor that supports the received events`, async () => {

    jest.spyOn(useCases[0], 'supports').mockReturnValue(false);
    await consumer.handlePlayerLevelUpTopicMessage(gameLevelUpEventMock);

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(0);
    expect(useCases[1].processEvent).toHaveBeenCalledTimes(0);
  });

  it(`should call to use-case with received events from "${GAMING_PLAYER_LEVEL_UP_TOPIC}" topic`, async () => {

    jest.spyOn(useCases[0], 'processEvent');
    await consumer.handlePlayerLevelUpTopicMessage(gameLevelUpEventMock);

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(1);
    expect(useCases[0].processEvent).toHaveBeenCalledWith(gameLevelUpEventMock);
  });

  it(`should call to use-case with received events from "${GAMING_PLAYER_ITEM_ACQUIRED_TOPIC}" topic`, async () => {

    jest.spyOn(useCases[0], 'processEvent');
    await consumer.handleItemAcquiredTopicMessage(gameItemAcquiredEventMock);

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(1);
    expect(useCases[0].processEvent).toHaveBeenCalledWith(gameItemAcquiredEventMock);

    expect(useCases[1].processEvent).toHaveBeenCalledTimes(0);
  });

  it(`should call to use-case with received events from "${GAMING_CHALLENGE_COMPLETED_TOPIC}" topic`, async () => {

    jest.spyOn(useCases[0], 'processEvent');
    await consumer.handleChallengeCompletedTopicMessage(gameChallengeCompletedEventMock);

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(1);
    expect(useCases[0].processEvent).toHaveBeenCalledWith(gameChallengeCompletedEventMock);

    expect(useCases[1].processEvent).toHaveBeenCalledTimes(0);
  });

  it(`should call to use-case with received events from "${GAMING_PVP_TOPIC}" topic`, async () => {

    jest.spyOn(useCases[0], 'processEvent');
    await consumer.handlePvPTopicMessage(gamePvPEventMock);

    expect(useCases[0].processEvent).toHaveBeenCalledTimes(1);
    expect(useCases[0].processEvent).toHaveBeenCalledWith(gamePvPEventMock);

    expect(useCases[1].processEvent).toHaveBeenCalledTimes(0);
  });

});
