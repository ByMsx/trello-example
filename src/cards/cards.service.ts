import { Inject, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from '../models';
import { ModelService } from '../model-service.class';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardsService extends ModelService<Card, CardDto, UpdateCardDto> {
  constructor(@Inject('CARDS_REPO') model: typeof Card) {
    super(model, CardDto);
  }

  create(columnId: number, ownerId: number, createCardDto: CreateCardDto) {
    return this.model.create({
      ...createCardDto,
      columnId,
      ownerId,
    });
  }

  findColumnCards(columnId: number) {
    return this.model.findAll({ where: { columnId } });
  }
}
