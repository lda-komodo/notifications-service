import { NotificationsPreferences } from './in-memory.entities';
import {
  NotificationPreferencesChannelNamesEnum,
  NotificationPreferencesStatusEnum,
} from '../../../core/domain/entities/notifications.enum';

export const NotificationsPreferencesRecords: Record<
  string,
  NotificationsPreferences[]
> = {
  ['1']: [
    new NotificationsPreferences(
      '1',
      NotificationPreferencesChannelNamesEnum.SMS,
      '+57 (320)-4557896',
      NotificationPreferencesStatusEnum.ACTIVE,
    ),
    new NotificationsPreferences(
      '1',
      NotificationPreferencesChannelNamesEnum.EMAIL,
      'someone@test.com',
      NotificationPreferencesStatusEnum.ACTIVE,
    ),
    new NotificationsPreferences(
      '1',
      NotificationPreferencesChannelNamesEnum.PUSH,
      'device-ID123456',
      NotificationPreferencesStatusEnum.ACTIVE,
    ),
  ],
  ['2']: [
    new NotificationsPreferences(
      '2',
      NotificationPreferencesChannelNamesEnum.SMS,
      '+57 (320)-4557896',
      NotificationPreferencesStatusEnum.ACTIVE,
    ),
    new NotificationsPreferences(
      '2',
      NotificationPreferencesChannelNamesEnum.EMAIL,
      'someone@test.com',
      NotificationPreferencesStatusEnum.ACTIVE,
    ),
    new NotificationsPreferences(
      '2',
      NotificationPreferencesChannelNamesEnum.PUSH,
      'device-ID123456',
      NotificationPreferencesStatusEnum.INACTIVE,
    ),
  ],
  ['3']: [
    new NotificationsPreferences(
      '3',
      NotificationPreferencesChannelNamesEnum.SMS,
      '+57 (320)-4557896',
      NotificationPreferencesStatusEnum.ACTIVE,
    ),
    new NotificationsPreferences(
      '3',
      NotificationPreferencesChannelNamesEnum.EMAIL,
      'someone@test.com',
      NotificationPreferencesStatusEnum.INACTIVE,
    ),
    new NotificationsPreferences(
      '3',
      NotificationPreferencesChannelNamesEnum.PUSH,
      'device-ID123456',
      NotificationPreferencesStatusEnum.ACTIVE,
    ),
  ],
};
