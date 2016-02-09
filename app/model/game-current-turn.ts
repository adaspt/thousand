export class GameCurrentTurn {
    constructor(playerCount: number) {
        this.scores = [];
        for (let i = 0; i < playerCount; i++) {
            this.scores.push(null);
        }
    }
    
    scores: number[];
    dropped: number;
}