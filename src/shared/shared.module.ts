import { Module } from '@nestjs/common';
import { ColumnsService } from "./columns.service";
import { IsColumnOwnerGuard } from "./is-column-owner-guard.service";
import { Column } from "../../models";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
  ],
  providers: [
    ColumnsService,
    IsColumnOwnerGuard,
    {
      provide: 'COLUMNS_REPO',
      useValue: Column,
    },
  ],
  exports: [
    IsColumnOwnerGuard,
    ColumnsService,
    AuthModule,
  ],
})
export class SharedModule {}
