import { Test, TestingModule } from '@nestjs/testing';
import { Transport, ClientProxy, ClientsModule } from '@nestjs/microservices';

import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { GameEventController } from '../../src/adapters/in/kafka/controllers/game-event.controller';

describe('GameEventController (e2e) - Kafka with Testcontainers', () => {
  let app;
  let client: ClientProxy;
  let kafkaContainer: StartedTestContainer;

  beforeAll(async () => {
    // Start Kafka container
    kafkaContainer = await new GenericContainer('confluentinc/cp-kafka')
      .withExposedPorts(9092)
      .withEnvironment({
        KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://localhost:9092',
      })
      .withEnvironment({ KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: '1' })
      .withEnvironment({ KAFKA_BROKER_ID: '1' })
      .start();

    const kafkaPort = kafkaContainer.getMappedPort(9092);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameEventController],
      imports: [
        ClientsModule.register([
          {
            name: 'GAME_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [`localhost:${kafkaPort}`],
              },
              consumer: {
                groupId: 'game-consumer-group',
              },
            },
          },
        ]),
      ],
    }).compile();

    app = module.createNestApplication();
    app.connectMicroservice({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`localhost:${kafkaPort}`],
        },
        consumer: {
          groupId: 'game-consumer-group',
        },
      },
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('GAME_SERVICE');
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
    await app.close();
    await kafkaContainer.stop();
  });

  it('should process level up event', async () => {
    const result = client.send('game.level_up', { userId: '123', level: 10 });
    expect(result).toBe('Player 123 reached level 10');
  });

  it('should throw error on invalid data', async () => {
    await expect(client.send('game.level_up', {})).rejects.toThrow();
  });
});
