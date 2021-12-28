import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from "../../models";

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: 'COMMENTS_REPO',
      useValue: Comment,
    }
  ]
})
export class CommentsModule {}
