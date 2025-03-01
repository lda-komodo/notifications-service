import { Module } from '@nestjs/common';
import { LevelUpEventUseCase } from './use-cases/level-up-event.use-case';
import { OutAdaptersModule } from '../../adapters/out/out.module';
import {
  DomainModule,
  DomainModuleInjectionTokens,
} from '../domain/domain.module';
import { ItemAcquiredEventUseCase } from './use-cases/item-acquired-event.use-case';
import { FriendRequestEventUseCase } from './use-cases/friend-request-event.use-case';
import { FriendRequestAcceptedEventUseCase } from './use-cases/friend-request-accepted-event.use-case';
import { PlayerVsPlayerEventUseCase } from './use-cases/player-vs-player-event.use-case';

@Module({
  imports: [OutAdaptersModule, DomainModule],
  providers: [
    LevelUpEventUseCase,
    ItemAcquiredEventUseCase,
    PlayerVsPlayerEventUseCase,
    FriendRequestEventUseCase,
    FriendRequestAcceptedEventUseCase,
    {
      provide: DomainModuleInjectionTokens.PROCESS_LEVEL_UP_EVENT_INTERFACE,
      useClass: LevelUpEventUseCase,
    },
    {
      provide: DomainModuleInjectionTokens.EVENT_PROCESSORS,
      useFactory: (
        processLevelUpEventUseCase: LevelUpEventUseCase,
        itemAcquiredEventUseCase: ItemAcquiredEventUseCase,
        playerVsPlayerEventUseCase: PlayerVsPlayerEventUseCase,
        friendRequestEventUseCase: FriendRequestEventUseCase,
        friendRequestAcceptedEventUseCase: FriendRequestAcceptedEventUseCase,
      ) => [
        processLevelUpEventUseCase,
        itemAcquiredEventUseCase,
        playerVsPlayerEventUseCase,
        friendRequestEventUseCase,
        friendRequestAcceptedEventUseCase,
      ],
      inject: [
        LevelUpEventUseCase,
        ItemAcquiredEventUseCase,
        PlayerVsPlayerEventUseCase,
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
