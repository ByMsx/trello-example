import { NotFoundException } from '@nestjs/common';
import { Model } from 'sequelize';

export class ModelService<T extends Model, D, U> {
  constructor(protected model: any, protected dtoConstructor: new () => D) {}

  findAll(): Promise<D[]> {
    return this.model.findAll({ raw: true });
  }

  async findOne(id: number): Promise<D> {
    const instance = await this.model.findByPk(id, { raw: true });
    return this.mapToDto(instance);
  }

  private async findOne_(id: number): Promise<T> {
    const instance = await this.model.findByPk(id);
    if (!instance) {
      throw new NotFoundException();
    }

    return instance;
  }

  async update(id: number, updateCardDto: U) {
    const card = await this.findOne_(id);
    return card.update(updateCardDto);
  }

  async remove(id: number) {
    const card = await this.findOne_(id);
    await card.destroy();
  }

  private mapToDto(instance: T): D {
    const dto = new this.dtoConstructor();
    Object.assign(dto, instance);
    return dto;
  }
}
