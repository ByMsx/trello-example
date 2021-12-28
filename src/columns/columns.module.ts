import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [ColumnsController],
  exports: [],
  providers: []
})
export class ColumnsModule {}
