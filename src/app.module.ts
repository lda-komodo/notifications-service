import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {InAdaptersModule} from "./adapters/in/in.module";
import {AdaptersModule} from "./adapters/adapters.module";
import {SharedModule} from "./shared/shared.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: false }),
    InfrastructureModule,
    AdaptersModule
    /*
    CoreModule,
     */
  ],
  exports: [InfrastructureModule, AdaptersModule],
})
export class AppModule {}
