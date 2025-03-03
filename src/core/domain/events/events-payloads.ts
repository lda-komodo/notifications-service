export class BaseEventPayload {
  messageId: string;
  userId: string;
  timestamp: string;
}

export class GameLevelUpEventPayload extends BaseEventPayload {
  newLevel: number
}

export class GameItemAcquiredEventPayload extends BaseEventPayload {
  itemName: string;
}

export class GamePvPEventPayload extends BaseEventPayload {
  vsUser: number;
}

export class GameChallengeCompletedEventPayload extends BaseEventPayload {
  challenge: string;
}

export class BaseSocialEventPayload extends BaseEventPayload {
  fromUserId: string;
}

