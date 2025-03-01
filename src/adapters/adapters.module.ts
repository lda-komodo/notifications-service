import { Module } from '@nestjs/common';
import { InAdaptersModule } from './in/in.module';
import { OutAdaptersModule } from './out/out.module';

@Module({
  imports: [InAdaptersModule, OutAdaptersModule],
  exports: [InAdaptersModule, OutAdaptersModule],
})
export class AdaptersModule {}
