import { Module } from '@nestjs/common';
import { ImpersonatorsController } from './controllers/impersonators.controller';
import {CandidatesScoringManagerModule } from "./services/candidates-scoring/candidates-scoring-manager.module";

@Module({
  imports: [CandidatesScoringManagerModule],
  controllers: [ImpersonatorsController],
  providers: [],
})
export class AppModule {}
