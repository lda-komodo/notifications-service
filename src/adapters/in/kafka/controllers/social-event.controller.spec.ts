import { Test, TestingModule } from '@nestjs/testing';
import { SocialEventController } from './social-event.controller';

describe('SocialEventConsumerController', () => {
  let controller: SocialEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialEventController],
    }).compile();

    controller = module.get<SocialEventController>(SocialEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
