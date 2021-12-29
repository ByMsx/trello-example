import { ColumnAttributes } from '../../models/column';

export class ColumnDto implements ColumnAttributes {
  id: number;
  ownerId: number;
  title: string;
}
