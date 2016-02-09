import * as React from 'react';
import * as model from '../model'

import {PlayerList} from './player-list';
import {Game} from './game';

interface IAppProps {
    game: model.Game;
}

interface IAppState {
}

export class App extends React.Component<IAppProps, IAppState> {
    render() {
        let players = this.props.game.players;
        let turns = this.props.game.turns;
        let current = this.props.game.current;
        
        if (this.props.game.state === model.GameState.Players) {
            return <PlayerList players={players} />;
        }
        
        return (<Game players={players} turns={turns} current={current} />);
    }
}
