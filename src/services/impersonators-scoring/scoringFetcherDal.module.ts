import { ResembleServiceModule } from "src/api/scoring/resembleFetcher.module";
import { Module } from '@nestjs/common';

@Module({
    imports: [ResembleServiceModule],
    exports: [ResembleServiceModule]
})
export class ScoringFetcherDalModule {}