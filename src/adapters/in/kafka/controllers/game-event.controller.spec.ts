import { Test, TestingModule } from '@nestjs/testing';
import { GameEventController } from './game-event.controller';
import { ClientKafka } from '@nestjs/microservices';
import { GAMING_PLAYER_LEVEL_UP_TOPIC } from '../../../../shared/config/kafka.config';
import { GameLevelUpEvent } from '../../../../core/domain/events/types';

describe('GameEventConsumer', () => {
  let consumer: GameEventController;
  let kafkaClient: ClientKafka;

  beforeEach(async () => {
    kafkaClient = {
      subscribeToResponseOf: jest.fn(),
      connect: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameEventController,
        { provide: ClientKafka, useValue: kafkaClient },
      ],
    }).compile();

    consumer = module.get<GameEventController>(GameEventController);
  });

  it('should be defined', () => {
    expect(consumer).toBeDefined();
  });

  it(`should call to use-case with received events from "${GAMING_PLAYER_LEVEL_UP_TOPIC}" topic`, async () => {
    const event: GameLevelUpEvent = {
      userId: '123456',
      messageId: '987654321',
      timestamp: '1721654987',
      newLevel: 15,
    };
    await consumer.handlePlayerLevelUpTopicMessage(event);
  });
});
