import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

export type UserCredentials = Pick<User, 'email'> & { password: string };

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private users: UsersService) {}

  async findUserByCredentials(
    email: string,
    password: string,
  ): Promise<UserDto> {
    return this.users.findByEmailAndPassword(email, password);
  }

  login(user: any) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
