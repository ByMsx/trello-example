import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserCredentials } from '../auth.service';

export class SignInDto implements UserCredentials {
  @ApiProperty({ example: 'john.doe@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, maxLength: 16 })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}
