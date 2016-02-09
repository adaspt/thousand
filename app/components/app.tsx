import * as React from 'react';
import {Game as GameModel} from '../model/game'
import {GameState} from '../model/game-state'

import {PlayerList} from './player-list';
import {Game} from './game';

interface IAppProps {
    model: GameModel;
}

interface IAppState {
}

export class App extends React.Component<IAppProps, IAppState> {
    render() {
        let players = this.props.model.players;
        let turns = this.props.model.turns;
        let current = this.props.model.current;
        
        if (this.props.model.state === GameState.Players) {
            return <PlayerList players={players} />;
        }
        
        return (<Game players={players} turns={turns} current={current} />);
    }
}
