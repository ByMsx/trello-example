import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { IsColumnOwnerGuard } from "../shared/is-column-owner-guard.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(IsColumnOwnerGuard)
  @Post()
  create(@Param('columnId', ParseIntPipe) columnId: number, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(columnId, createCardDto);
  }

  @Get()
  findAll(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.cardsService.findColumnCards(columnId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.findOne(id);
  }

  @UseGuards(IsColumnOwnerGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @UseGuards(IsColumnOwnerGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.remove(id);
  }
}
