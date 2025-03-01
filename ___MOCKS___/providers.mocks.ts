import { DomainModuleInjectionTokens } from '../src/core/domain/domain.module';

export const domainProviders = () => {
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