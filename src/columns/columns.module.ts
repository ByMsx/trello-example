import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { IsColumnOwnerGuard } from './is-column-owner-guard.service';
import { Column } from '../models';

@Module({
  imports: [],
  controllers: [ColumnsController],
  exports: [],
  providers: [
    ColumnsService,
    IsColumnOwnerGuard,
    {
      provide: 'COLUMNS_REPO',
      useValue: Column,
    },
  ],
})
export class ColumnsModule {}
