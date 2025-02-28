export type BaseEvent = {
  messageId: string;
  userId: string;
  timestamp: string;
};

export type GameLevelUpEvent = BaseEvent & {
  newLevel: number;
};

export type GameItemAcquiredEvent = BaseEvent & {
  itemName: string;
};

export type SocialFriendRequestEvent = BaseEvent & {
  toUserId: string;
};

export type SocialFriendRequestAcceptedEvent = SocialFriendRequestEvent;
