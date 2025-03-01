import {
  BaseEvent,
  GameChallengeCompletedEvent,
  GameItemAcquiredEvent,
  GameLevelUpEvent,
  GamePvPEvent, SocialFriendRequestAcceptedEvent, SocialFriendRequestEvent, SocialNewFollowerEvent,
} from '../src/core/domain/events/types';

export const baseEventMock: BaseEvent = { timestamp: '1740847010', messageId: '43BFbY6vBExYsvGhcTuw3', userId: 'user123' };

export const gameLevelUpEventMock: GameLevelUpEvent = {
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987',
  newLevel: 15,
};
export const gameItemAcquiredEventMock: GameItemAcquiredEvent = {
  itemName: 'SuperItem',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const gameChallengeCompletedEventMock: GameChallengeCompletedEvent = {
  challenge: 'Kill the Dragon',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const gamePvPEventMock: GamePvPEvent = {
  vsUser: 8,
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const socialNewFollowerEventMock: SocialNewFollowerEvent = {
  fromUserId: '10',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const socialFriendRequestEventMock: SocialFriendRequestEvent = {
  fromUserId: '10',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};

export const socialFriendRequestAcceptedEventEventMock: SocialFriendRequestAcceptedEvent = {
  fromUserId: '10',
  userId: '123456',
  messageId: '987654321',
  timestamp: '1721654987'
};