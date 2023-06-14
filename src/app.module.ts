import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImpersonatorsController } from './controllers/impersonators.controller';
import { AppService } from './app.service';
import {ImpersonatorsScoringManagerModule } from "./services/impersonators-scoring/impersonatorsScoringManager.module";

@Module({
  imports: [ImpersonatorsScoringManagerModule],
  controllers: [AppController, ImpersonatorsController],
  providers: [AppService],
})
export class AppModule {}
