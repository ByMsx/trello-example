import { CommentCreationAttributes } from '../../models/comment';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto
  implements Omit<CommentCreationAttributes, 'cardId' | 'ownerId'>
{
  @ApiProperty({ maxLength: 512 })
  @IsString()
  @Length(0, 512)
  text: string;
}
