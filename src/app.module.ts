import { Module } from '@nestjs/common';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule, Routes } from '@nestjs/core';
import { CommentsModule } from './comments/comments.module';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: 'columns',
    module: ColumnsModule,
    children: [{ path: '/:columnId/cards', module: CardsModule }],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    ColumnsModule,
    CommentsModule,
    CardsModule,
    UsersModule,
  ],
})
export class AppModule {}
