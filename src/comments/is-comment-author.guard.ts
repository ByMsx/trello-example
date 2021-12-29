import { CanActivate, Injectable } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { IsOwnerGuard } from '../is-owner.guard';
import { Comment } from '../models';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class IsCommentAuthorGuard
  extends IsOwnerGuard<Comment, CommentDto>
  implements CanActivate
{
  constructor(commentsService: CommentsService) {
    super(commentsService, 'id');
  }
}
