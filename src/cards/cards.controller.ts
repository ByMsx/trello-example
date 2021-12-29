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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Card } from '../models';
import { IsCardOwnerGuard } from './is-card-owner.guard';
import { User, UserFromJwt } from '../auth/user.decorator';

@ApiTags('cards')
@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(IsCardOwnerGuard)
  @Post()
  @ApiOperation({ summary: 'Creates card' })
  @ApiResponse({ status: 201, type: Card })
  create(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() createCardDto: CreateCardDto,
    @User() user: UserFromJwt,
  ) {
    return this.cardsService.create(columnId, user.id, createCardDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Cards of column', type: [Card] })
  findAll(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.cardsService.findColumnCards(columnId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Card })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.findOne(id);
  }

  @UseGuards(IsCardOwnerGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @UseGuards(IsCardOwnerGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Removes card' })
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.cardsService.remove(id);
  }
}
