import { ResembleFetcher } from "src/api/scoring/resembleFetcher.service";
import { Module } from '@nestjs/common';
import { ScoringFetcherDalModule } from "./scoringFetcherDal.module";
import { ImpersonatorsScoringManager } from "./impersonatorsScoringManager.service";

@Module({
    imports: [ScoringFetcherDalModule],
    providers: [ImpersonatorsScoringManager],
    exports: [ImpersonatorsScoringManager]
})
export class ImpersonatorsScoringManagerModule {}