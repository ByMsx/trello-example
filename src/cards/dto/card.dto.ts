import { CardAttributes } from '../../models/card';

export class CardDto implements CardAttributes {
  id: number;
  columnId: number;
  description: string;
  ownerId: number;
  title: string;
}
