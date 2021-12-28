import { Association, DataTypes, Model, Optional } from "sequelize";
import { User } from "./user";
import { Card } from "./card";
import { sequelize } from "./connection";
import { ApiProperty } from "@nestjs/swagger";

export interface CommentAttributes {
  id: number;
  authorId: number;
  cardId: number;
  text: string;
}

export type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  @ApiProperty()
  public id!: number;
  @ApiProperty()
  public text!: string;
  @ApiProperty()
  public cardId!: number;
  @ApiProperty()
  public authorId!: number;

  public readonly card?: Card;
  public readonly author?: User;

  public static associations: {
    card: Association<Comment, Card>,
    author: Association<Comment, User>,
  };
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  cardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cards',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  modelName: 'Comment',
  tableName: 'Comments',
  sequelize,
});
