import { Module } from '@nestjs/common';
import { LevelUpUseCase } from './use-cases/level-up-event.use-case';
import { OutAdaptersModule } from '../../adapters/out/out.module';
import {
  DomainModule,
  DomainModuleInjectionTokens,
} from '../domain/domain.module';
import { ItemAcquiredUseCase } from './use-cases/item-acquired-event.use-case';

@Module({
  imports: [OutAdaptersModule, DomainModule],
  providers: [
    LevelUpUseCase,
    ItemAcquiredUseCase,
    {
      provide: DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
      useClass: LevelUpUseCase,
    },
    {
      provide: DomainModuleInjectionTokens.EVENT_PROCESSORS,
      useFactory: (
        processLevelUpEventUseCase: LevelUpUseCase,
        itemAcquiredEventUseCase: ItemAcquiredUseCase,
      ) => [processLevelUpEventUseCase, itemAcquiredEventUseCase],
      inject: [LevelUpUseCase, ItemAcquiredUseCase],
    },
  ],
  exports: [
    DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
    DomainModuleInjectionTokens.EVENT_PROCESSORS,
  ],
})
export class ApplicationModule {}
