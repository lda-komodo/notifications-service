import {
  BaseEventPayload,
  BaseSocialEventPayload,
  GameChallengeCompletedEventPayload,
  GameItemAcquiredEventPayload,
  GameLevelUpEventPayload,
  GamePvPEventPayload,
} from '../src/core/domain/events/events-payloads';

export const baseEventMock: BaseEventPayload = {
  timestamp: '1740847010',
  messageId: '43BFbY6vBExYsvGhcTuw3',
  userId: 'user123',
};

export const gameLevelUpEventMock: GameLevelUpEventPayload = {
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987',
  newLevel: 15,
};
export const gameItemAcquiredEventMock: GameItemAcquiredEventPayload = {
  itemName: 'SuperItem',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const gameChallengeCompletedEventMock: GameChallengeCompletedEventPayload = {
  challenge: 'Kill the Dragon',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const gamePvPEventMock: GamePvPEventPayload = {
  vsUser: 8,
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const socialNewFollowerEventMock: BaseSocialEventPayload = {
  fromUserId: '10',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const socialFriendRequestEventMock: BaseSocialEventPayload = {
  fromUserId: '10',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const socialFriendRequestAcceptedEventEventMock: BaseSocialEventPayload = {
  fromUserId: '10',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};