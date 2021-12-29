import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../models';
import { ModelService } from '../model-service.class';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService extends ModelService<
  Comment,
  CommentDto,
  UpdateCommentDto
> {
  constructor(@Inject('COMMENTS_REPO') model: typeof Comment) {
    super(model, CommentDto);
  }

  create(authorId: number, cardId: number, createCommentDto: CreateCommentDto) {
    return this.model.create({
      ...createCommentDto,
      cardId,
      authorId,
    });
  }

  findAllInCard(cardId: number) {
    return this.model.findAll({
      where: {
        cardId,
      },
    });
  }
}
