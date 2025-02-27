import { Test, TestingModule } from '@nestjs/testing';
import { GameEventController } from './game-event.controller';
import { ClientKafka } from '@nestjs/microservices';
import {GAMING_PLAYER_LEVEL_UP_TOPIC} from "../../../../shared/config/kafka.config";

describe('GameEventConsumer', () => {
    let consumer: GameEventController;
    let kafkaClient: ClientKafka;

    beforeEach(async () => {
        kafkaClient = { subscribeToResponseOf: jest.fn(), connect: jest.fn() } as any;

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
        const event = { type: 'LevelUp', playerId: '123' };
        await consumer.handlePlayerLevelUpTopicMessage(event);
    });
});