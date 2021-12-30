import { Association, DataTypes, Model, Optional } from 'sequelize';
import { Column } from './column';
import { sequelize } from './connection';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user';
import { HaveOwner } from '../have-owner.interface';

export interface CardAttributes {
  id: number;
  title: string;
  description: string;
  columnId: number;
  ownerId: number;
}

export type CardCreationAttributes = Optional<CardAttributes, 'id'>;

export class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes, HaveOwner
{
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public columnId: number;
  @ApiProperty()
  public ownerId: number;

  @ApiProperty()
  public readonly createdAt: Date;
  @ApiProperty()
  public readonly updatedAt: Date;

  public readonly column?: Column;

  public static associations: {
    column: Association<Card, Column>;
    owner: Association<Card, User>;
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
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
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
