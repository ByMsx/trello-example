import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtSettings } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersModule } from '../users/users.module';
import { SignInController } from './sign-in.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSettings.secret,
      signOptions: { expiresIn: '10000m' },
    }),
    UsersModule,
  ],
  controllers: [SignInController],
  exports: [JwtModule, AuthService, LocalAuthGuard, JwtAuthGuard],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    LocalAuthGuard,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
