import { CardCreationAttributes } from "../../../models/card";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateCardDto implements Omit<CardCreationAttributes, 'columnId'> {
  @IsString()
  @Length(1, 512)
  @IsOptional()
  description: string;

  @IsString()
  @Length(0, 32)
  title: string;
}
