import {GameState} from './game-state';
import {GamePlayer} from './game-player';
import {GameTurn} from './game-turn';

export class Game {
    constructor(
        private render: () => void) {
    }
    
    state = GameState.Players;
    players: GamePlayer[] = [];
    turns: GameTurn[] = [];
    current = new GameTurn();
    
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
    
    play() {
        this.state = GameState.Game;
        this.render();
    }
}