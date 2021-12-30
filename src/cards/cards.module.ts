import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from '../models';

@Module({
  controllers: [CardsController],
  providers: [CardsService, { provide: 'CARDS_REPO', useValue: Card }],
})
export class CardsModule {}
