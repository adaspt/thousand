import * as React from 'react';
import {GamePlayer} from '../model/game-player'
import {GameState} from '../model/game-state'
import {model} from '../main';

import {Player} from './player';

interface IPlayerListProps {
    players: GamePlayer[];
}

interface IPlayerListState {
}

export class PlayerList extends React.Component<IPlayerListProps, IPlayerListState> {
    constructor(props) {
        super(props);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        model.play();
    }
    
    render() {
        let player1 = this.props.players.length > 0 ? this.props.players[0] : null;
        let player2 = this.props.players.length > 1 ? this.props.players[1] : null;
        let player3 = this.props.players.length > 2 ? this.props.players[2] : null;
        let player4 = this.props.players.length > 3 ? this.props.players[3] : null;

        return (
            <div>
                <h1>Thousand <small>Players</small></h1>
                <form onSubmit={this.handleSubmit}>
                    <Player index={0} player={player1} placeholder="Player 1" />
                    <Player index={1} player={player2} placeholder="Player 2" />
                    <Player index={2} player={player3} placeholder="Player 3" />
                    <Player index={3} player={player4} placeholder="Player 4" />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Play</button>
                    </div>
                </form>
            </div>);
    }
}
