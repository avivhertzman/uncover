import { Injectable } from "@nestjs/common";
import { IScoringFetcherDal } from "src/core/abstract/IScoringFetcherDal.service";
import { CreateUsersDto } from "src/core/dto/users.dto";
import { ScoringResponse } from "src/core/dto/scoring-response.dto";
import fetch from "node-fetch";


@Injectable()
export class ImpersonatorsScoringManager {
    constructor(private scoringFetcher: IScoringFetcherDal) {

    }
    async getSortedImpersonators(users: CreateUsersDto): Promise<ScoringResponse[]> {
        let userBuffer: Buffer = await this.getBuffer(users.user.profile_pic_url_hd);
        var scoring: ScoringResponse[] = [];
        await Promise.all(users.candidates.map(async (can) => {
            try {
                let candidatAsBuffer: Buffer = await this.getBuffer(can.profile_pic_url_hd);
                var score = await this.scoringFetcher.getScoring(candidatAsBuffer, userBuffer);
                console.log(score);
                scoring.push(new ScoringResponse(can.username, score));
            }
            catch (e) {
                console.log(`error retrieving scoring for user ${can.username} with picurl ${can.profile_pic_url_hd} because of ${e}`)
            }
        }));
        return scoring;
    }
    async getBuffer(picUrl: string) {
        let fileImg = await fetch(picUrl);
        let asbuffer = Buffer.from(await fileImg.arrayBuffer());
        return asbuffer;
    }

}