import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImpersonatorsController } from './controllers/impersonators.controller';
import { AppService } from './app.service';
import {CandidatesScoringManagerModule } from "./services/candidates-scoring/candidates-scoring-manager.module";

@Module({
  imports: [CandidatesScoringManagerModule],
  controllers: [AppController, ImpersonatorsController],
  providers: [AppService],
})
export class AppModule {}
