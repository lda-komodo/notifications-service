export type BaseEvent = {
    id: string;
    eventPayload: GameLevelUpEvent | GameItemAcquiredEvent;
    timestamp: string;
}

export type GameLevelUpEvent = {
    newLevel: number;
}

export type GameItemAcquiredEvent = {
    itemName: string;
}

export type SocialFriendRequestEvent = {
    fromUserId: string;
    toUserId: string;
}

export type SocialFriendRequestAcceptedEvent = SocialFriendRequestEvent;

