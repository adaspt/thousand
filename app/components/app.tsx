import * as React from 'react';
import {Game} from '../model/game'
import {GameState} from '../model/game-state'

import {PlayerList} from './player-list';

interface IAppProps {
    model: Game;
}

interface IAppState {
}

export class App extends React.Component<IAppProps, IAppState> {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.model.state === GameState.Players) {
            return <PlayerList players={this.props.model.players} />;
        }
        
        return (<h1>Thousand <small>Play</small></h1>);
    }
}
