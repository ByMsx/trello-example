import { CanActivate, Injectable } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { IsOwnerGuard } from '../is-owner.guard';
import { Column } from '../models';
import { ColumnDto } from './dto/column.dto';

@Injectable()
export class IsColumnOwnerGuard
  extends IsOwnerGuard<Column, ColumnDto>
  implements CanActivate
{
  constructor(columnsService: ColumnsService) {
    super(columnsService, 'columnId');
  }
}
