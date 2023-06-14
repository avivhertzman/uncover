import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { CreateUsersDto } from '../core/dto/index';
import { ImpersonatorsScoringManager } from 'src/services/impersonators-scoring';
import { ScoringResponse } from 'src/core/dto/scoring-response.dto';

@Controller('api/impersonators')
export class ImpersonatorsController {
  constructor(private impersonatorsScoringManager: ImpersonatorsScoringManager) { }

  @Post()
  async getHello(@Body() usersDto: CreateUsersDto): Promise<ScoringResponse[]> {
    return (await this.impersonatorsScoringManager.getSortedImpersonators(usersDto));
  }
}
