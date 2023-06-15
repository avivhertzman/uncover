import { Controller, Post, Body } from '@nestjs/common';
import { UsersDto } from '../core/dto/index';
import { CandidatesScoringManager } from 'src/services/candidates-scoring';
import { ScoringResponse } from 'src/core/dto/scoring-response.dto';

@Controller('api/impersonators')
export class ImpersonatorsController {
  constructor(private candidatesScoringManager: CandidatesScoringManager) { }

  @Post()
  async getImpersonators(@Body() usersDto: UsersDto): Promise<ScoringResponse[]> {
    return await this.candidatesScoringManager.getCandidatesScoring(usersDto);
  }
}
