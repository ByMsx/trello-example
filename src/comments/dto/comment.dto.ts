import { CommentAttributes } from '../../models/comment';

export class CommentDto implements CommentAttributes {
  id: number;
  cardId: number;
  ownerId: number;
  text: string;
}
