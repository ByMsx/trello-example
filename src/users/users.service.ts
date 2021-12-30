import { Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import * as md5 from 'md5';
import { User } from '../models';
import { UserCredentials } from '../auth/auth.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private model: typeof User) {}

  findOne(where: FindOptions['where']): Promise<UserDto> {
    return this.model.findOne({
      where,
      raw: true,
    });
  }

  findByEmailAndPassword(email: string, password: string): Promise<UserDto> {
    return this.findOne({
      email,
      passwordHash: this.hashPassword(password),
    });
  }

  hashPassword(password: UserCredentials['password']): User['passwordHash'] {
    return md5(password);
  }
}
