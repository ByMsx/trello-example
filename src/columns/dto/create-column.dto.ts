import { ColumnCreationAttributes } from "../../../models/column";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Optional } from "sequelize";

export class CreateColumnDto implements Optional<ColumnCreationAttributes, 'ownerId'> {
  @IsNotEmpty()
  @IsString()
  @Length(1, 32)
  title: string;
}
