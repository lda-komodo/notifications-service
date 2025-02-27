// shared/config/kafka.config.ts
import { registerAs } from '@nestjs/config';

export const GAMING_PLAYER_LEVEL_UP_TOPIC = 'gaming.player.level.up';
export const GAMING_PLAYER_ITEM_ACQUIRED_TOPIC = 'gaming.player.item.acquired';
export const SOCIAL_FRIEND_REQUEST_TOPIC = 'social.fried.request';
export const SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC = 'social.fried.request.accepted';

export default registerAs('kafka', () => ({
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9094'],
    groupId: process.env.KAFKA_GROUP_ID || 'game-events-consumer',
    clientId: process.env.KAFKA_CLIENT_ID || 'game-notifier',
    retries: parseInt(process.env.KAFKA_RETRIES ?? '5', 10),
    requestTimeout: parseInt(process.env.KAFKA_REQUEST_TIMEOUT ?? '30000', 10),
}));