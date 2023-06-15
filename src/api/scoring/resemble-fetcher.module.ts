import { Module, Res } from '@nestjs/common';
import { IScoringFetcherDal } from '../../core/abstract/scoring-fetcher-dal.service';

import { ResembleFetcher } from './resembleFetcher.service';

@Module({
    providers: [
        {
            provide: IScoringFetcherDal,
            useClass: ResembleFetcher,
        },
    ],
    exports: [IScoringFetcherDal],
})
export class ResembleServiceModule { }