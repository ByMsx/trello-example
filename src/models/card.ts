import {
  Association,
  BelongsToGetAssociationMixin,
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import { Column } from './column';
import { sequelize } from './connection';
import { ApiProperty } from '@nestjs/swagger';

export interface CardAttributes {
  id: number;
  title: string;
  description: string;
  columnId: number;
}

export type CardCreationAttributes = Optional<CardAttributes, 'id'>;

export class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes
{
  //TODO: лучше выделить отдельно DTO-Response и в контроллерах возвращать не модели, а DTO.
  // Т.к. часто приходится вешать дополнительную логику на него.
  @ApiProperty()
  // TODO: а зачем '!'?
  public id!: number;
  @ApiProperty()
  public title!: string;
  @ApiProperty()
  public description!: string;
  @ApiProperty()
  public columnId!: number;

  @ApiProperty()
  public readonly createdAt!: Date;
  @ApiProperty()
  public readonly updatedAt!: Date;

  public readonly column?: Column;

  public getColumn: BelongsToGetAssociationMixin<Column>;

  public async canUserEdit(userId: number): Promise<boolean> {
    const column = await this.getColumn();
    return column.canUserEdit(userId);
  }

  public static associations: {
    column: Association<Card, Column>;
  };
}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    columnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Columns',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    tableName: 'Cards',
    modelName: 'Card',
    sequelize,
  },
);
