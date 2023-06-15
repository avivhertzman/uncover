export class ScoringResponse {
    constructor(private username: string, private similarityScore: Promise<number>) { }
}