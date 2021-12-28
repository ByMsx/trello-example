import { ColumnCreationAttributes } from "../../../models/column";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Optional } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";

export class CreateColumnDto implements Optional<ColumnCreationAttributes, 'ownerId'> {
  @ApiProperty({ maxLength: 32, minLength: 1 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 32)
  title: string;
}
