import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Snippet, SnippetSchema } from './schemas/snippet.schema';
import { SnippetsController } from './snippets.controller';
import { SnippetsRepository } from './snippets.repository';
import { SnippetsService } from './snippets.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Snippet.name,
        schema: SnippetSchema,
      },
    ]),
  ],
  controllers: [SnippetsController],
  providers: [SnippetsService, SnippetsRepository],
})
export class SnippetsModule {}
