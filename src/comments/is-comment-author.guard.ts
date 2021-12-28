import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentsService } from "./comments.service";

@Injectable()
export class IsCommentAuthorGuard implements CanActivate {
  constructor(private commentsService: CommentsService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const { user, params: { id } } = context.switchToHttp().getRequest();
      const comment = await this.commentsService.findOne(id);
      return comment.authorId === user.id;
    }

    throw new Error('Not implemented');
  }
}