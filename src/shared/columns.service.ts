import {
  ForbiddenException,
  HttpCode,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Column } from '../models';
import { UpdateColumnDto } from '../columns/dto/update-column.dto';
import { CreateColumnDto } from '../columns/dto/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(@Inject('COLUMNS_REPO') private model: typeof Column) {}

  create(createColumnDto: CreateColumnDto, ownerId: number) {
    return this.model.create({
      ...createColumnDto,
      ownerId,
    });
  }

  findAll() {
    return this.model.findAll();
  }

  async findOne(id: number) {
    const col = await this.model.findByPk(id);
    if (!col) {
      throw new NotFoundException();
    }

    return col;
  }

  async findOneAndCheckAccess(id: number, ownerId: number) {
    const col = await this.findOne(id);

    if (!col.canUserEdit(ownerId)) {
      throw new ForbiddenException();
    }

    return col;
  }

  async update(id: number, updateColumnDto: UpdateColumnDto) {
    return this.model.update(updateColumnDto, { where: { id } });
  }

  @HttpCode(204)
  async remove(id: number) {
    return this.model.destroy({ where: { id } });
  }
}
