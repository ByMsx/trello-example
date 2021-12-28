import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ColumnsService } from '../shared/columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserFromJwt, User } from '../auth/user.decorator';
import { IsColumnOwnerGuard } from '../shared/is-column-owner-guard.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Column } from '../models';

@ApiTags('columns')
@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a column' })
  @ApiResponse({ status: 201, description: 'Created', type: Column })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createColumnDto: CreateColumnDto, @User() user: UserFromJwt) {
    return this.columnsService.create(createColumnDto, user.id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Column] })
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':columnId')
  @ApiResponse({ status: 200, type: Column })
  @ApiParam({ name: 'columnId', type: Number, description: 'ID of column' })
  findOne(@Param('columnId', ParseIntPipe) id: number) {
    return this.columnsService.findOne(id);
  }

  @UseGuards(IsColumnOwnerGuard)
  @Patch(':columnId')
  @ApiResponse({ status: 200, type: Column })
  @ApiParam({
    name: 'columnId',
    type: Number,
    description: 'ID of column to change',
  })
  update(
    @Param('columnId', ParseIntPipe) id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @UseGuards(IsColumnOwnerGuard)
  @Delete(':columnId')
  @HttpCode(204)
  @ApiParam({
    name: 'columnId',
    type: Number,
    description: 'ID of column to remove',
  })
  async remove(@Param('columnId', ParseIntPipe) id: number) {
    await this.columnsService.remove(+id);
  }
}
