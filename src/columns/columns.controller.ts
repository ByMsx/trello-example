import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, ParseIntPipe
} from "@nestjs/common";
import { ColumnsService} from "../shared/columns.service";
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserFromJwt, User } from "../auth/user.decorator";
import { IsColumnOwnerGuard } from "../shared/is-column-owner-guard.service";

@Controller('')
@UseGuards(JwtAuthGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto, @User() user: UserFromJwt) {
    return this.columnsService.create(createColumnDto, user.id);
  }

  @Get()
  findAll(@User() user: UserFromJwt) {
    return this.columnsService.findAll();
  }

  @Get(':columnId')
  findOne(@Param('columnId', ParseIntPipe) id: number) {
    return this.columnsService.findOne(id);
  }

  @UseGuards(IsColumnOwnerGuard)
  @Patch(':columnId')
  update(@Param('columnId', ParseIntPipe) id: number, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @UseGuards(IsColumnOwnerGuard)
  @Delete(':columnId')
  remove(@Param('columnId', ParseIntPipe) id: number) {
    return this.columnsService.remove(+id);
  }
}
