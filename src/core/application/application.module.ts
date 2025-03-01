import { Module } from '@nestjs/common';
import { LevelUpUseCase } from './use-cases/level-up-event.use-case';
import { OutAdaptersModule } from '../../adapters/out/out.module';
import {
  DomainModule,
  DomainModuleInjectionTokens,
} from '../domain/domain.module';
import { ItemAcquiredUseCase } from './use-cases/item-acquired-event.use-case';
import { FriendRequestEventUseCase } from './use-cases/friend-request-event.use-case';
import { FriendRequestAcceptedEventUseCase } from './use-cases/friend-request-accepted-event.use-case';

@Module({
  imports: [OutAdaptersModule, DomainModule],
  providers: [
    LevelUpUseCase,
    ItemAcquiredUseCase,
    FriendRequestEventUseCase,
    FriendRequestAcceptedEventUseCase,
    {
      provide: DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
      useClass: LevelUpUseCase,
    },
    {
      provide: DomainModuleInjectionTokens.EVENT_PROCESSORS,
      useFactory: (
        processLevelUpEventUseCase: LevelUpUseCase,
        itemAcquiredEventUseCase: ItemAcquiredUseCase,
        friendRequestEventUseCase: FriendRequestEventUseCase,
        friendRequestAcceptedEventUseCase: FriendRequestAcceptedEventUseCase,
      ) => [
        processLevelUpEventUseCase,
        itemAcquiredEventUseCase,
        friendRequestEventUseCase,
        friendRequestAcceptedEventUseCase,
      ],
      inject: [
        LevelUpUseCase,
        ItemAcquiredUseCase,
        FriendRequestEventUseCase,
        FriendRequestAcceptedEventUseCase,
      ],
    },
  ],
  exports: [
    DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
    DomainModuleInjectionTokens.EVENT_PROCESSORS,
  ],
})
export class ApplicationModule {}
