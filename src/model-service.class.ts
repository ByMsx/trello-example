import { NotFoundException } from '@nestjs/common';
import { Model } from 'sequelize';
import { plainToClass } from 'class-transformer';

export class ModelService<T extends Model, D, U> {
  constructor(protected model: any, protected dtoConstructor: new () => D) {}

  async findAll(): Promise<D[]> {
    const records = await this.model.findAll();
    return records.map((record) => this.mapToDto(record));
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
    await card.update(updateCardDto);
    return this.mapToDto(card);
  }

  async remove(id: number) {
    const card = await this.findOne_(id);
    await card.destroy();
  }

  protected mapToDto(instance: T): D {
    return plainToClass(this.dtoConstructor, instance);
  }
}
