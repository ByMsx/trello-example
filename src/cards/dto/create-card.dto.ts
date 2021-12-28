import { CardCreationAttributes } from '../../models/card';
import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto implements Omit<CardCreationAttributes, 'columnId'> {
  @ApiProperty({ maxLength: 512, minLength: 1 })
  @IsString()
  @Length(1, 512)
  @IsOptional()
  description: string;

  @ApiProperty({ minLength: 0, maxLength: 32 })
  @IsString()
  @Length(0, 32)
  title: string;
}
