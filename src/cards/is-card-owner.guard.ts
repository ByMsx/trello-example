import { CanActivate, Injectable } from '@nestjs/common';
import { IsOwnerGuard } from '../is-owner.guard';
import { Card } from '../models';
import { CardsService } from './cards.service';
import { CardDto } from './dto/card.dto';

@Injectable()
export class IsCardOwnerGuard
  extends IsOwnerGuard<Card, CardDto>
  implements CanActivate
{
  constructor(service: CardsService) {
    super(service, 'id');
  }
}
