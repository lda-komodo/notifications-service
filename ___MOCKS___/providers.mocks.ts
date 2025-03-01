import { DomainModuleInjectionTokens } from '../src/core/domain/domain.module';
import { NotificationServiceInterface } from '../src/core/domain/services/interfaces/notifications-service.interface';

export const controllersProviders = () => {
  return {
    provide: DomainModuleInjectionTokens.EVENT_PROCESSORS,
    useFactory: (uno = {
      supports: jest.fn().mockReturnValue(true),
      processEvent: jest.fn().mockResolvedValue(undefined),
    }, dos = {
      supports: jest.fn().mockReturnValue(false),
      processEvent: jest.fn().mockResolvedValue(undefined),
    }) => [uno, dos],
  };
};

export const eventValidationServicesMockProviders = () => {
  return {
      provide: DomainModuleInjectionTokens.EVENTS_VALIDATION_SERVICES,
      useFactory: (validationServiceMock1 = {
        shouldProcess: jest.fn().mockReturnValue(true),
      }, validationServiceMock2 = {
        shouldProcess: jest.fn().mockReturnValue(false),
      }) => [validationServiceMock1, validationServiceMock2],
    };
};

export const notificationServicesMockProvider
  = () => {
  return {
    provide: DomainModuleInjectionTokens.NOTIFICATION_SERVICE,
    useValue: {
      processNotification: jest.fn().mockResolvedValue(undefined),
    },
  };
};