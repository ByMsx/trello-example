import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignInController } from "./sign-in/sign-in.controller";
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from "./auth/auth.module";
import { RouterModule, Routes } from "@nestjs/core";
import { CommentsModule } from './comments/comments.module';
import { CardsModule } from './cards/cards.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: 'columns',
    module: ColumnsModule,
    children: [
      { path: '/:columnId/cards', module: CardsModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    ColumnsModule,
    CommentsModule,
    CardsModule,
    SharedModule,
  ],
  controllers: [
    AppController,
    SignInController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
