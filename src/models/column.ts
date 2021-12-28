import { Association, DataTypes, Model, Optional } from 'sequelize';
import { User } from './user';
import { sequelize } from './connection';
import { ApiProperty } from '@nestjs/swagger';

export interface ColumnAttributes {
  id: number;
  title: string;

  ownerId: number;
}

export type ColumnCreationAttributes = Optional<ColumnAttributes, 'id'>;

export class Column
  extends Model<ColumnAttributes, ColumnCreationAttributes>
  implements ColumnAttributes
{
  @ApiProperty()
  public id!: number;
  @ApiProperty()
  public title!: string;

  @ApiProperty()
  public ownerId!: number;
  public readonly owner?: User;

  @ApiProperty()
  public readonly createdAt!: Date;
  @ApiProperty()
  public readonly updatedAt!: Date;

  public canUserEdit(userId: number): boolean {
    return this.ownerId === userId;
  }

  public static associations: {
    owner: Association<Column, User>;
  };
}

Column.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    modelName: 'Column',
    tableName: 'Columns',
    sequelize,
  },
);
