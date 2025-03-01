// shared/config/kafka.config.ts
import { registerAs } from '@nestjs/config';

export const GAMING_PLAYER_LEVEL_UP_TOPIC = 'gaming.player.level.up';
export const GAMING_PLAYER_ITEM_ACQUIRED_TOPIC = 'gaming.player.item.acquired';
export const GAMING_PVP_TOPIC = 'gaming.pvp';
export const GAMING_CHALLENGE_COMPLETED_TOPIC = 'gaming.challenge.completed';
export const SOCIAL_FRIEND_REQUEST_TOPIC = 'social.friend.request';
export const SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC =
  'social.friend.request.accepted';
export const SOCIAL_NEW_FOLLOWER_TOPIC =
  'social.new.follower';

export default registerAs('kafka', () => ({
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9094'],
  groupId: process.env.KAFKA_GROUP_ID || 'game-events-consumer',
  clientId: process.env.KAFKA_CLIENT_ID || 'game-notifier',
  retries: parseInt(process.env.KAFKA_RETRIES ?? '5', 10),
  requestTimeout: parseInt(process.env.KAFKA_REQUEST_TIMEOUT ?? '5000', 10),
}));
