import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QuerySnippetsDto } from './dto/query-snippets.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetsRepository } from './snippets.repository';
import { Snippet } from './schemas/snippet.schema';
import {
  Pagination,
  SnippetChanges,
  SnippetData,
  SnippetFilters,
  SnippetListResponse,
} from './snippets.types';

@Injectable()
export class SnippetsService {
  constructor(private readonly snippetsRepository: SnippetsRepository) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const data: SnippetData = {
      ...createSnippetDto,
      tags: this.normalizeTags(createSnippetDto.tags),
    };

    return this.snippetsRepository.create(data);
  }

  async findAll(query: QuerySnippetsDto): Promise<SnippetListResponse> {
    const pagination: Pagination = {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
    };

    const filters: SnippetFilters = {
      tag: query.tag,
      type: query.type,
      search: query.q,
    };

    const { items, total } = await this.snippetsRepository.findMany({
      filters,
      pagination,
    });

    return this.buildListResponse(items, total, pagination);
  }

  async findTags(): Promise<string[]> {
    const tags = await this.snippetsRepository.findTags();

    return tags.sort((left, right) => left.localeCompare(right));
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetsRepository.findById(id);

    if (!snippet) {
      this.throwNotFound(id);
    }

    return snippet;
  }

  async update(
    id: string,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippet> {
    const changes: SnippetChanges = {
      ...updateSnippetDto,
      ...(updateSnippetDto.tags !== undefined
        ? { tags: this.normalizeTags(updateSnippetDto.tags) }
        : {}),
    };

    const snippet = await this.snippetsRepository.updateById(id, changes);

    if (!snippet) {
      this.throwNotFound(id);
    }

    return snippet;
  }

  async remove(id: string): Promise<void> {
    const snippet = await this.snippetsRepository.deleteById(id);

    if (!snippet) {
      this.throwNotFound(id);
    }
  }

  private throwNotFound(id: string): never {
    throw new NotFoundException(`Snippet with id "${id}" was not found.`);
  }

  private buildListResponse(
    items: Snippet[],
    total: number,
    pagination: Pagination,
  ): SnippetListResponse {
    return {
      items,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit) || 1,
      },
    };
  }

  private normalizeTags(tags: string[]): string[] {
    return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
  }
}
