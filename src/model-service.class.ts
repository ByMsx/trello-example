import { HttpCode, NotFoundException } from "@nestjs/common";
import { Model } from "sequelize";

export class ModelService<T extends Model, U> {
  constructor(protected model: any) { // TODO: fix any
  }

  findAll() {
    return this.model.findAll();
  }

  async findOne(id: number): Promise<T> {
    const instance = await this.model.findByPk(id);
    if (!instance) {
      throw new NotFoundException();
    }

    return instance;
  }

  async update(id: number, updateCardDto: U) {
    const card = await this.findOne(id);
    return card.update(updateCardDto);
  }

  @HttpCode(204)
  async remove(id: number) {
    const card = await this.findOne(id);
    await card.destroy();
  }
}