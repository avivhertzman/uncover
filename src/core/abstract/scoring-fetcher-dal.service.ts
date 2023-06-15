
export abstract class IScoringFetcherDal {
    abstract getScoring(user: Buffer, candidate: Buffer)
}