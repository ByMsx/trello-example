import { Association, BelongsToGetAssociationMixin, DataTypes, Model, Optional } from "sequelize";
import { Column } from "./column";
import { sequelize } from "./connection";

export interface CardAttributes {
  id: number;
  title: string;
  description: string;
  columnId: number;
}

export type CardCreationAttributes = Optional<CardAttributes, 'id'>;

export class Card extends Model<CardAttributes, CardCreationAttributes> implements CardAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public columnId!: number;

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

Card.init({
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
}, {
  tableName: 'Cards',
  modelName: 'Card',
  sequelize,
});
