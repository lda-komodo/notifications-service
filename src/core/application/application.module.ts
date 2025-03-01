import { Module } from '@nestjs/common';
import { ProcessLevelUpEventUseCase } from './use-cases/process-level-up-event.use-case';
import { OutAdaptersModule } from '../../adapters/out/out.module';
import { DomainModule, DomainModuleInjectionTokens } from '../domain/domain.module';

@Module({
  imports: [OutAdaptersModule, DomainModule],
  providers: [
    ProcessLevelUpEventUseCase,
    {
      provide: DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
      useClass: ProcessLevelUpEventUseCase,
    },
    {
      provide: DomainModuleInjectionTokens.EVENT_PROCESSORS,
      useFactory: (processLevelUpEventUseCase: ProcessLevelUpEventUseCase) => [
        processLevelUpEventUseCase,
      ],
      inject: [ProcessLevelUpEventUseCase],
    },
  ],
  exports: [
    DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
    DomainModuleInjectionTokens.EVENT_PROCESSORS,
  ],
})
export class ApplicationModule {
}
