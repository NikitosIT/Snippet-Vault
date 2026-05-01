import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';

import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import {
  Pagination,
  SnippetChanges,
  SnippetData,
  SnippetFilters,
  SnippetListResult,
} from './snippets.types';

type SnippetFilter = QueryFilter<SnippetDocument>;

type ListSnippetsParams = {
  filters: SnippetFilters;
  pagination: Pagination;
};

@Injectable()
export class SnippetsRepository {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  create(data: SnippetData): Promise<Snippet> {
    return this.snippetModel.create(data);
  }

  async findMany(params: ListSnippetsParams): Promise<SnippetListResult> {
    const { filters, pagination } = params;
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    const mongoFilter = this.buildMongoFilter(filters);

    const [items, total] = await Promise.all([
      this.snippetModel
        .find(mongoFilter)
        .sort({ updatedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.snippetModel.countDocuments(mongoFilter),
    ]);

    return {
      items,
      total,
    };
  }

  findTags(): Promise<string[]> {
    return this.snippetModel.distinct('tags');
  }

  findById(id: string): Promise<Snippet | null> {
    return this.snippetModel.findById(id).lean().exec();
  }

  updateById(id: string, changes: SnippetChanges): Promise<Snippet | null> {
    return this.snippetModel
      .findByIdAndUpdate(id, changes, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  deleteById(id: string): Promise<Snippet | null> {
    return this.snippetModel.findByIdAndDelete(id).lean().exec();
  }

  private buildMongoFilter(filters: SnippetFilters): SnippetFilter {
    const mongoFilter: SnippetFilter = {};

    if (filters.tag) {
      mongoFilter.tags = filters.tag;
    }

    if (filters.type) {
      mongoFilter.type = filters.type;
    }

    if (filters.search) {
      mongoFilter.$text = { $search: filters.search.trim() };
    }

    return mongoFilter;
  }
}
