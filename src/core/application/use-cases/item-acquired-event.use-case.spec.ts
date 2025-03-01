import { Test, TestingModule } from '@nestjs/testing';
import { ItemAcquiredEventUseCase } from './item-acquired-event.use-case';
import { EventType } from '../../domain/events/event-type.enum';
import { MessageTemplates } from '../../domain/messages/message-templates';
import {
  eventValidationServicesMockProviders,
  notificationServicesMockProvider,
} from '../../../../___MOCKS___/providers.mocks';
import { gameItemAcquiredEventMock } from '../../../../___MOCKS___/game-events.mocks';

describe('ItemAcquiredEventUseCase', () => {
  let useCase: ItemAcquiredEventUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemAcquiredEventUseCase,
        eventValidationServicesMockProviders(),
        notificationServicesMockProvider(),
      ],
    }).compile();

    useCase = module.get<ItemAcquiredEventUseCase>(ItemAcquiredEventUseCase);
  });

  it('supports should return true for ITEM_ACQUIRED event type', () => {
    expect(useCase.supports(EventType.ITEM_ACQUIRED)).toBe(true);
  });

  it('supports should return false for other event types', () => {
    expect(useCase.supports(EventType.PLAYER_LEVEL_UP)).toBe(false);
  });

  it('getMessageTemplate should return correct message template for valid event', () => {
    const expectedMessage = `You've acquired SuperItem item`;
    jest.spyOn(MessageTemplates[EventType.ITEM_ACQUIRED], 'generateMessage');

    const message = useCase.getMessageTemplate(gameItemAcquiredEventMock);

    expect(message).toBe(expectedMessage);
    expect(
      MessageTemplates[EventType.ITEM_ACQUIRED].generateMessage,
    ).toHaveBeenCalledWith({
      userName: gameItemAcquiredEventMock.userId,
      itemName: gameItemAcquiredEventMock.itemName,
    });
  });
});
