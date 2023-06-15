import { Module } from '@nestjs/common';
import { ScoringFetcherDalModule } from "./scoring-fetcher-dal.module";
import { CandidatesScoringManager } from "./candidates-scoring-manager.service";
import { ImageFetcherModule } from "src/api/image/image-fetcher.module";

@Module({
    imports: [ScoringFetcherDalModule, ImageFetcherModule],
    providers: [CandidatesScoringManager],
    exports: [CandidatesScoringManager]
})
export class CandidatesScoringManagerModule { }