import { Module } from '@nestjs/common';
import { InAdaptersModule } from './in/in.module';
import { OutModule } from './out/out.module';

@Module({
  imports: [InAdaptersModule, OutModule],
  exports: [InAdaptersModule, OutModule],
})
export class AdaptersModule {}
