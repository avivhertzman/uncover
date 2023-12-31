import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { IScoringFetcherDal } from "../../core/abstract/scoring-fetcher-dal.service"
import { UsersDto } from "../../core/dto/users.dto";
import { ScoringResponse } from "../../core/dto/scoring-response.dto";
import { ImageFetcher } from "../../api/image/image-fetcher.service";
import * as log from 'log-to-file';
import { Person } from "src/core";

const ERROR_LOG_FILE = 'logging.log';

@Injectable()
export class CandidatesScoringManager {
    constructor(private scoringFetcher: IScoringFetcherDal, private imageFetcher: ImageFetcher) {
    }
    async getCandidatesScoring(users: UsersDto): Promise<ScoringResponse[]> {
        let userBuffer: Buffer

        try {
            userBuffer = await this.imageFetcher.getBuffer(users.user.profile_pic_url_hd);
        } catch (e) {
            this.handleUserError(users.user.username, e);
        }

        return this.getScoringList(users.candidates, userBuffer);
    }

    private async getScoringList(candidates, userBuffer) {
        var scoring: ScoringResponse[] = [];

        await Promise.all(candidates.map(async (can) => {
            try {
                scoring.push(new ScoringResponse(can.username, await this.getCandidateScore(can, userBuffer)));
            }
            catch (e) {
                log(`error retrieving matching scoring for user ${can.username} with picurl ${can.profile_pic_url_hd} because of ${e}`
                    , ERROR_LOG_FILE, '\r\n');
            }
        }));

        return scoring;
    }

    private async getCandidateScore(can: Person, userBuffer: Buffer) {
        let candidatAsBuffer: Buffer = await this.imageFetcher.getBuffer(can.profile_pic_url_hd);
        return await this.scoringFetcher.getScoring(candidatAsBuffer, userBuffer);
    }

    private handleUserError(username: string, error: string) {
        let logMessage = `error retrieveing impersonators for user ${username} because of ${error}`;
        log(logMessage, ERROR_LOG_FILE, '\r\n');
        throw new HttpException(logMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}