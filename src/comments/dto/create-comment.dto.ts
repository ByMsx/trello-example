import { CommentCreationAttributes } from "../../../models/comment";
import { IsString, Length } from "class-validator";

export class CreateCommentDto implements Omit<CommentCreationAttributes, 'cardId' | 'authorId'> {
  @IsString()
  @Length(0, 512)
  text: string;
}
