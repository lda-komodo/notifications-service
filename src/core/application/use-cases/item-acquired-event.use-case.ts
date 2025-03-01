import { Injectable } from '@nestjs/common';
import { GameItemAcquiredEvent } from '../../domain/events/types';
import { EventType } from '../../domain/events/event-type.enum';
import { MessageTemplates } from '../../domain/messages/message-templates';
import { BaseEventUseCase } from './base-event.use-case';

@Injectable()
export class ItemAcquiredEventUseCase extends BaseEventUseCase<GameItemAcquiredEvent> {
  supports(eventType: EventType): boolean {
    return eventType === EventType.ITEM_ACQUIRED;
  }

  getMessageTemplate(event: GameItemAcquiredEvent): string {
    return MessageTemplates[EventType.ITEM_ACQUIRED].generateMessage({
      userName: event.userId,
      itemName: event.itemName,
    });
  }
}
