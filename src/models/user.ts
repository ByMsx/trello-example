import {
  Association,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from './connection';
import { Column } from './column';

export interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public passwordHash!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly columns?: Column[];

  public createColumn!: HasManyCreateAssociationMixin<Column>;
  public getColumns!: HasManyGetAssociationsMixin<Column>;

  public static associations: {
    columns: Association<User, Column>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
    modelName: 'User',
    sequelize,
  },
);
