import { Test, TestingModule } from '@nestjs/testing';

import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

describe('SnippetsController', () => {
  let controller: SnippetsController;
  let snippetsService: jest.Mocked<Pick<SnippetsService, never>>;

  beforeEach(async () => {
    snippetsService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetsController],
      providers: [
        {
          provide: SnippetsService,
          useValue: snippetsService,
        },
      ],
    }).compile();

    controller = module.get<SnippetsController>(SnippetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
