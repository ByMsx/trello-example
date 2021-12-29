import { Inject, Injectable } from '@nestjs/common';
import { Column } from '../models';
import { UpdateColumnDto } from './dto/update-column.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { ModelService } from '../model-service.class';
import { ColumnDto } from './dto/column.dto';

@Injectable()
export class ColumnsService extends ModelService<
  Column,
  ColumnDto,
  UpdateColumnDto
> {
  constructor(@Inject('COLUMNS_REPO') model: typeof Column) {
    super(model, ColumnDto);
  }

  create(createColumnDto: CreateColumnDto, ownerId: number) {
    return this.model.create({
      ...createColumnDto,
      ownerId,
    });
  }
}
