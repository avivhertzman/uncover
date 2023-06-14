import { CreateUsersDto } from "../dto/users.dto";

export abstract class IScoringFetcherDal {
    abstract getScoring(user: Buffer, candidate: Buffer)
}