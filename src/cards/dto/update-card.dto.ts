import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { ApiExtraModels } from "@nestjs/swagger";

export class UpdateCardDto extends PartialType(CreateCardDto) {}
