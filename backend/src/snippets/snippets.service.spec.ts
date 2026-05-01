import { Test, TestingModule } from '@nestjs/testing';

import { SnippetsRepository } from './snippets.repository';
import { SnippetsService } from './snippets.service';

describe('SnippetsService', () => {
  let service: SnippetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnippetsService,
        {
          provide: SnippetsRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SnippetsService>(SnippetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
