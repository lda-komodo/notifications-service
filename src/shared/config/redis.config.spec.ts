import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from './redis.config';
import { Test, TestingModule } from '@nestjs/testing';

describe('RedisConfig', () => {
  let configService: ConfigService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    process.env.REDIS_HOST = 'localhost';
    process.env.REDIS_PORT = '6379';

    moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [redisConfig] })],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should load Redis host from environment variables', () => {
    expect(configService.get('redis.host')).toEqual('localhost');
  });

  it('should load Redis port from environment variables', () => {
    expect(configService.get('redis.port')).toEqual(6379);
  });

  it('should use default values if environment variables are not set', async () => {
    delete process.env.REDIS_HOST;
    delete process.env.REDIS_PORT;

    moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [redisConfig] })],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);

    expect(configService.get('redis.host')).toEqual('localhost');
    expect(configService.get('redis.port')).toEqual(6379);
  });
});
