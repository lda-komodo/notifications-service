import { MessageTemplateMapper } from './message-template.mapper';
import { EventType } from '../events/event-type.enum';

export const MessageTemplates: Record<EventType, MessageTemplateMapper> = {
  [EventType.PLAYER_LEVEL_UP]: new MessageTemplateMapper(
    "Congratulations {{userName}}! You've reached level {{newLevel}}",
  ),
  [EventType.ITEM_ACQUIRED]: new MessageTemplateMapper(
    "You've acquired the {{itemName}} item",
  ),
  [EventType.FRIEND_REQUEST_SENT]: new MessageTemplateMapper(
    '{{fromUser}} has sent you a friend request',
  ),
  [EventType.FRIEND_REQUEST_ACCEPTED]: new MessageTemplateMapper(
    '{{fromUser}} accepted your friend request',
  ),
};
