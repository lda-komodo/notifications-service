import { Module } from '@nestjs/common';
import { ProcessLevelUpEventUseCase } from './use-cases/process-level-up-event.use-case';
import { OutAdaptersModule } from '../../adapters/out/out.module';
import { DomainModule, DomainModuleInjectionTokens } from '../domain/domain.module';

@Module({
  imports: [OutAdaptersModule, DomainModule],
  providers: [
    {
      provide: DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
      useClass: ProcessLevelUpEventUseCase,
    },
  ],
  exports: [DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE],
})
export class ApplicationModule {
}
