import {
  Body,
  Controller,
  Post, Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService, UserCredentials } from "../auth/auth.service";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Request } from "express";
import { LocalAuthGuard } from "../auth/local-auth.guard";

class SignInDto implements UserCredentials {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}

@Controller('sign-in')
export class SignInController {
  constructor(private auth: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async signIn(@Req() req: Request, @Body() signInDto: SignInDto) {
    return this.auth.login(req.user);
  }
}
