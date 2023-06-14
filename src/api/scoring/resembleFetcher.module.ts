import { Module, Res } from '@nestjs/common';
import { IScoringFetcherDal } from '../../core/abstract/IScoringFetcherDal.service';

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