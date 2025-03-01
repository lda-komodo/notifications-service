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

export type GamePvPEvent = BaseEvent & {
  vsUser: number;
};

export type GameChallengeCompletedEvent = BaseEvent & {
  challenge: string;
};

export type SocialFriendRequestEvent = BaseEvent & {
  fromUserId: string;
};

export type SocialFriendRequestAcceptedEvent = SocialFriendRequestEvent;
export type SocialNewFollowerEvent = SocialFriendRequestEvent;
