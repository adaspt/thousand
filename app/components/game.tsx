import * as React from 'react';
import {GamePlayer} from '../model/game-player';
import {GameTurn} from '../model/game-turn';
import {GameCurrentTurn} from '../model/game-current-turn';

import {TurnList} from './turn-list';

interface IGameProps {
    players: GamePlayer[];
    turns: GameTurn[];
    current: GameCurrentTurn;
}

interface IGameState {
}

export class Game extends React.Component<IGameProps, IGameState> {
    render() {
        let players = this.props.players;
        let turns = this.props.turns;
        let current = this.props.current;
        
        return (
            <div>
                <h1>Thousand <small>Play</small></h1>
                <TurnList players={players} turns={turns} current={current} />
            </div>
        );
    }
}