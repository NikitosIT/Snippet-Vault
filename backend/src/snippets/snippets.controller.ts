import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QuerySnippetsDto } from './dto/query-snippets.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetsService } from './snippets.service';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  findAll(@Query() query: QuerySnippetsDto) {
    return this.snippetsService.findAll(query);
  }

  @Get('tags')
  findTags() {
    return this.snippetsService.findTags();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    await this.snippetsService.remove(id);
  }
}
