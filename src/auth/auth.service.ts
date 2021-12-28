import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { User } from '../models';

export type UserCredentials = Pick<User, 'email'> & { password: string };

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async findUserByCredentials(credentials: UserCredentials): Promise<User> {
    return this.userModel.findOne({
      where: {
        email: credentials.email,
        passwordHash: this.hashPassword(credentials.password),
      },
    });
  }

  login(user: any) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  hashPassword(password: UserCredentials['password']): User['passwordHash'] {
    return md5(password);
  }
}
