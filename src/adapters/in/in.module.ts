import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { ApplicationModule } from '../../core/application/application.module';
import { DomainModule } from '../../core/domain/domain.module';
import { GameEventController } from './kafka/controllers/game-event.controller';
import { SocialEventController } from './kafka/controllers/social-event.controller';

@Module({
  imports: [InfrastructureModule, ApplicationModule, DomainModule],
  controllers: [GameEventController, SocialEventController],
})
export class InAdaptersModule {
}
