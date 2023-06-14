export class ScoringResponse {
    constructor(private username: string, private score: number) {}
    toString() {
        return `name: ${this.username}. score: ${this.score}`;
    }

}