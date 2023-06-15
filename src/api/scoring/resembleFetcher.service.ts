import { Injectable } from "@nestjs/common";
import { IScoringFetcherDal } from "src/core/abstract/scoring-fetcher-dal.service";
import * as resemble from 'nodejs-resemble';

const FULL_PRECENTAGE = 100;

@Injectable()
export class ResembleFetcher implements IScoringFetcherDal {
      getScoring(user: Buffer, candidate: Buffer) {
        return new Promise((resolve) => {
             resemble(user).compareTo(candidate).ignoreColors().onComplete(function (data) {
                return resolve(FULL_PRECENTAGE -
                    parseInt(data.misMatchPercentage))

            })
        })
    }
}
