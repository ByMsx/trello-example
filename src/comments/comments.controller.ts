import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserFromJwt, User } from '../auth/user.decorator';
import { IsCommentAuthorGuard } from './is-comment-author.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from '../models';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Posts a comment' })
  @ApiResponse({ status: 201, type: Comment })
  create(
    @Param('cardId', ParseIntPipe) cardId: number,
    @User() user: UserFromJwt,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(user.id, cardId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all comments in the Card' })
  @ApiResponse({ status: 200, type: [Comment] })
  findAll(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.commentsService.findAllInCard(cardId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch the Comments by ID' })
  @ApiParam({ type: Number, name: 'id', description: 'Comment ID to get' })
  @ApiResponse({ status: 200, type: Comment })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(IsCommentAuthorGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update comment' })
  @ApiParam({ type: Number, name: 'id', description: 'Comment ID to edit' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(IsCommentAuthorGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove comment by ID' })
  @ApiParam({ type: Number, name: 'id', description: 'Comment ID to remove' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
