export enum EventType {
  PLAYER_LEVEL_UP = 'PLAYER_LEVEL_UP',
  FRIEND_REQUEST_SENT = 'FRIEND_REQUEST_SENT',
  FRIEND_REQUEST_ACCEPTED = 'FRIEND_REQUEST_ACCEPTED',
}

export class MessageTemplate {
  constructor(private readonly template: string) {
  }

  generateMessage(placeholders: Record<string, string>): string {
    return Object.entries(placeholders)
      .map(([key, value]) => ({
        regex: new RegExp(`\$\{${key}\}`, 'g'),
        value,
      }))
      .reduce(
        (message, { regex, value }) => message.replace(regex, value),
        this.template,
      );
  }
}

export const MessageTemplates: Record<EventType, MessageTemplate> = {
  [EventType.PLAYER_LEVEL_UP]: new MessageTemplate(
    'Congratulations ${userName}! You\'ve reached level ${newLevel}',
  ),
  [EventType.FRIEND_REQUEST_SENT]: new MessageTemplate(
    '${userName} has sent you a friend request',
  ),
  [EventType.FRIEND_REQUEST_ACCEPTED]: new MessageTemplate(
    '${userName} accepted your friend request',
  ),
};
