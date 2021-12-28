import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from "../../models";
import { ModelService } from "../model-service.class";

@Injectable()
export class CardsService extends ModelService<Card, UpdateCardDto>{
  constructor(@Inject('CARDS_REPO') model: typeof Card) {
    super(model);
  }

  create(columnId: number, createCardDto: CreateCardDto) {
    return this.model.create({
      ...createCardDto,
      columnId,
    });
  }

  findColumnCards(columnId: number) {
    return this.model.findAll({ where: { columnId } });
  }
}
