import { IsNotEmpty } from 'class-validator';

export class BaseEventPayload {
  @IsNotEmpty()
  messageId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  timestamp: string;
}

export class GameLevelUpEventPayload extends BaseEventPayload {
  @IsNotEmpty()
  newLevel: number
}

export class GameItemAcquiredEventPayload extends BaseEventPayload {
  @IsNotEmpty()
  itemName: string;
}

export class GamePvPEventPayload extends BaseEventPayload {
  @IsNotEmpty()
  vsUserId: string;
}

export class GameChallengeCompletedEventPayload extends BaseEventPayload {
  @IsNotEmpty()
  challenge: string;
}

export class BaseSocialEventPayload extends BaseEventPayload {
  @IsNotEmpty()
  fromUserId: string;
}

