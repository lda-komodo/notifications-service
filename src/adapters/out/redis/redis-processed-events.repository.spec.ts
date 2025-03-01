import { Test, TestingModule } from '@nestjs/testing';
import { RedisProcessedEventsRepository } from './redis-processed-events.repository';

const mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('RedisProcessedEventsRepository', () => {
  let repository: RedisProcessedEventsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisProcessedEventsRepository,
        { provide: 'REDIS_CLIENT', useValue: mockRedisClient },
      ],
    }).compile();

    repository = module.get<RedisProcessedEventsRepository>(
      RedisProcessedEventsRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if event exists in Redis', async () => {
    mockRedisClient.get.mockResolvedValue('PROCESSED');
    const result = await repository.exists('event123');
    expect(result).toBe(true);
    expect(mockRedisClient.get).toHaveBeenCalledWith('event123');
  });

  it('should return false if event does not exist in Redis', async () => {
    mockRedisClient.get.mockResolvedValue(null);
    const result = await repository.exists('event123');
    expect(result).toBe(false);
    expect(mockRedisClient.get).toHaveBeenCalledWith('event123');
  });

  it('should save event with TTL in Redis', async () => {
    await repository.save('event123', 3600);
    expect(mockRedisClient.set).toHaveBeenCalledWith(
      'event123',
      'PROCESSED',
      'EX',
      3600,
    );
  });
});
