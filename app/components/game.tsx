import * as React from 'react';
import * as model from '../model'

import {TurnList} from './turn-list';

interface IGameProps {
    players: model.GamePlayer[];
    turns: model.GameTurn[];
    current: model.GameCurrentTurn;
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