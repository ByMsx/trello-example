import { Request } from 'express';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

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
