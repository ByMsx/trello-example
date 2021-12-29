import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, UserCredentials } from '../auth/auth.service';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Request } from 'express';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

//TODO: в отдельный файл
class SignInDto implements UserCredentials {
  @ApiProperty({ example: 'john.doe@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, maxLength: 16 })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}

// TODO: необходимо создать отдельный модуль 'users'.
//В который перенести логику signIn, signUp, получение профиля текущего пользователя

@Controller('sign-in')
export class SignInController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 201,
    description: "Signed in. Receive your JWT from 'token' field.",
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async signIn(@Req() req: Request, @Body() signInDto: SignInDto) {
    return this.auth.login(req.user);
  }
}
