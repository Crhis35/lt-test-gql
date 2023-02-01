import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CoreModule } from './core/core.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [CoreModule],
})
export class CommonModule {}
