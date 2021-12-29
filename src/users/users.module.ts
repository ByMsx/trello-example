import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models';

@Module({
  exports: [UsersService],
  providers: [
    UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    },
  ],
})
export class UsersModule {}
