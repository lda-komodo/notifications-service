import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { InAdaptersModule } from './adapters/in/in.module';
import { OutAdaptersModule } from './adapters/out/out.module';
import { ApplicationModule } from './core/application/application.module';
import { DomainModule } from './core/domain/domain.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfrastructureModule,
    InAdaptersModule,
    OutAdaptersModule,
    ApplicationModule,
    DomainModule,
  ],
})
export class AppModule {}
