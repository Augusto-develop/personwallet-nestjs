import { Test, TestingModule } from '@nestjs/testing';
import { RetornoService } from './retorno.service';

describe('RetornoService', () => {
  let service: RetornoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetornoService],
    }).compile();

    service = module.get<RetornoService>(RetornoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
