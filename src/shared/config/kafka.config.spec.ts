import { ConfigModule, ConfigService } from '@nestjs/config';
import kafkaConfig from './kafka.config';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsModule, Transport } from '@nestjs/microservices';

jest.mock('@nestjs/microservices', () => ({
    ClientsModule: {
        registerAsync: jest.fn().mockReturnValue({
            providers: [],
            exports: [],
            module: class {},
        }),
    },
    Transport: {
        KAFKA: 'KAFKA',
    },
}));

describe('KafkaConfig', () => {
    let configService: ConfigService;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        process.env.KAFKA_BROKERS = 'localhost:9092';
        process.env.KAFKA_GROUP_ID = 'test-group';
        process.env.KAFKA_CLIENT_ID = 'test-client';
        process.env.KAFKA_RETRIES = '3';
        process.env.KAFKA_REQUEST_TIMEOUT = '15000';

        moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ load: [kafkaConfig] }),
                ClientsModule.registerAsync([{ name: 'KAFKA_SERVICE', useFactory: () => ({}) }]),
            ],
        }).compile();

        configService = moduleRef.get<ConfigService>(ConfigService);
    });

    afterEach(async () => {
        await moduleRef.close();
    });

    it('should load Kafka brokers from environment variables', () => {
        expect(configService.get('kafka.brokers')).toEqual(['localhost:9092']);
    });

    it('should load Kafka groupId from environment variables', () => {
        expect(configService.get('kafka.groupId')).toEqual('test-group');
    });

    it('should load Kafka clientId from environment variables', () => {
        expect(configService.get('kafka.clientId')).toEqual('test-client');
    });

    it('should load Kafka retries from environment variables', () => {
        expect(configService.get('kafka.retries')).toEqual(3);
    });

    it('should load Kafka requestTimeout from environment variables', () => {
        expect(configService.get('kafka.requestTimeout')).toEqual(15000);
    });

    it('should register Kafka client with ClientsModule', () => {
        expect(ClientsModule.registerAsync).toHaveBeenCalled();
    });
});