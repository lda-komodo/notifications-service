import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notifications.service';
import { OutAdapterModuleInjectionTokens } from '../../../adapters/out/out-adapters.module';
import { NotificationPreferencesStatusEnum } from '../entities/notifications.enum';
import {
  MockEmailNotificationChannel,
  MockNotificationPreferencesRepository,
} from '../../../../___MOCKS___/adapters.mocks';

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationChannel: MockEmailNotificationChannel;
  let notificationPreferencesRepository: MockNotificationPreferencesRepository;

  beforeEach(async () => {
    notificationChannel = new MockEmailNotificationChannel();
    notificationPreferencesRepository =
      new MockNotificationPreferencesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: OutAdapterModuleInjectionTokens.NOTIFICATION_CHANNELS,
          useValue: [notificationChannel],
        },
        {
          provide:
            OutAdapterModuleInjectionTokens.NOTIFICATIONS_PREFERENCES_REPOSITORY,
          useValue: notificationPreferencesRepository,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should log an error if user does not have notification preferences', async () => {
    const loggerErrorSpy = jest.spyOn(service['logger'], 'error');
    notificationPreferencesRepository.findByUserId.mockResolvedValue(null);

    await service.processNotification({
      userId: 'user123',
      message: 'Test message',
    });

    expect(loggerErrorSpy).toHaveBeenCalledWith(
      'User user123 does not have notifications preferences!',
    );
  });

  it('should send notification if user has active preferences', async () => {
    notificationPreferencesRepository.findByUserId.mockResolvedValue([
      {
        notificationChannel: 'EMAIL',
        status: NotificationPreferencesStatusEnum.ACTIVE,
        deliveryAddress: 'user@example.com',
      },
    ]);

    await service.processNotification({
      userId: 'user123',
      message: 'Test message',
    });

    expect(notificationChannel.send).toHaveBeenCalledWith(
      'Test message',
      'user@example.com',
    );
  });

  it('should not send notification if user preferences are inactive', async () => {
    notificationPreferencesRepository.findByUserId.mockResolvedValue([
      {
        notificationChannel: 'EMAIL',
        status: NotificationPreferencesStatusEnum.INACTIVE,
        deliveryAddress: 'user@example.com',
      },
    ]);

    await service.processNotification({
      userId: 'user123',
      message: 'Test message',
    });

    expect(notificationChannel.send).not.toHaveBeenCalled();
  });

  it('should log warnings if any notification channel fails', async () => {
    const loggerWarnSpy = jest.spyOn(service['logger'], 'warn');
    notificationPreferencesRepository.findByUserId.mockResolvedValue([
      {
        notificationChannel: 'EMAIL',
        status: NotificationPreferencesStatusEnum.ACTIVE,
        deliveryAddress: 'user@example.com',
      },
    ]);
    notificationChannel.send.mockRejectedValue(new Error('Channel error'));

    await service.processNotification({
      userId: 'user123',
      message: 'Test message',
    });

    expect(loggerWarnSpy).toHaveBeenCalledWith(
      'Message channel errors: Error: Channel error',
    );
  });
});
