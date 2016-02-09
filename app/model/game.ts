import {GameState} from './game-state';
import {GamePlayer} from './game-player';
import {GameTurn} from './game-turn';
import {GameCurrentTurn} from './game-current-turn';

export class Game {
    constructor(
        private render: () => void) {
    }
    
    state = GameState.Players;
    players: GamePlayer[] = [];
    turns: GameTurn[] = [];
    current: GameCurrentTurn;
    
    setPlayer(index: number, name: string) {
        let players = [
            new GamePlayer(),
            new GamePlayer(),
            new GamePlayer(),
            new GamePlayer()
        ];
        
        for (let i = 0; i < 4; i++) {
            players[i].name = index == i ? name : this.players.length > i ? this.players[i].name : null; 
        }
        
        for (let i = 3; i >= 0; i--) {
            if (players[i].name) {
                break;
            }
            
            players.pop();
        }
        
        this.players = players;
        
        this.render();
    }
    
    clear() {
        this.state = GameState.Players;
        this.turns = [];
        this.current = null;
        
        this.render();
    }
    
    play() {
        this.state = GameState.Game;
        this.current = new GameCurrentTurn(this.players.length);
        
        this.render();
    }
    
    next(scores: number[]) {
        if (scores.every((value) => value == null)) {
            return;
        }
        
        let currentScores: number[] = this.turns.length > 0 ? this.turns[this.turns.length - 1].totals : [0, 0, 0, 0];
        let turn = new GameTurn();
        turn.scores = scores;
        turn.totals = scores.map((value, index) => value + currentScores[index]);
        this.turns.push(turn);
        this.current = new GameCurrentTurn(this.players.length);
        
        this.render();
    }
    
    undo() {
        if (this.turns.length === 0) {
            return;
        }
        
        let lastTurn = this.turns.pop();
        let current = new GameCurrentTurn(this.players.length);
        current.dropped = lastTurn.dropped;
        for (let i = 0; i < this.players.length; i++) {
            current.scores[i] = lastTurn.scores[i];
        }
        
        this.current = current;
        
        this.render();
    }
}