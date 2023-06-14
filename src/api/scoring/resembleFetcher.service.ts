import { Injectable } from "@nestjs/common";
import { IScoringFetcherDal } from "src/core/abstract/IScoringFetcherDal.service";
import * as resemble from 'nodejs-resemble';


@Injectable()
export class ResembleFetcher implements IScoringFetcherDal {
      getScoring(user: Buffer, candidate: Buffer) {
        return new Promise((resolve) => {
             resemble(user).compareTo(candidate).ignoreColors().onComplete(function (data) {
                return resolve(100 -
                    parseInt(data.misMatchPercentage))

            })
        })
    }
}
