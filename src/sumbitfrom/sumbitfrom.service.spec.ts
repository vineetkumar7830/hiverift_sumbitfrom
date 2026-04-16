import { Test, TestingModule } from '@nestjs/testing';
import {SubmitFromService } from './sumbitfrom.service';

describe('SumbitfromService', () => {
  let service: SubmitFromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitFromService],
    }).compile();

    service = module.get<SubmitFromService>(SubmitFromService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
