import * as React from 'react';
import {GamePlayer} from '../model/game-player';
import {GameTurn} from '../model/game-turn';
import {GameCurrentTurn} from '../model/game-current-turn';

import {Turn} from './turn';
import {CurrentTurn} from './current-turn';

interface ITurnListProps {
    players: GamePlayer[];
    turns: GameTurn[];
    current: GameCurrentTurn;
}

interface ITurnListState {
}

export class TurnList extends React.Component<ITurnListProps, ITurnListState> {
    render() {
        let players = this.renderPlayers();
        let turns = this.renderTurns();
        
        return (
            <table className="table">
                {players}
                {turns}
                <CurrentTurn players={this.props.players} scores={this.props.current.scores} />
            </table>
        );
    }
    
    private renderPlayers() {
        let colClassNames = this.props.players.length === 3 ? 'col-xs-4' : 'col-xs-3';
        colClassNames += ' text-center';
        
        let players = this.props.players.map((player, index) => (
            <th key={index} className={colClassNames}>{player.name}</th>
        ));
        
        return (
            <thead>
                <tr>{players}</tr>
            </thead>
        );
    }
    
    private renderTurns() {
        let turns = this.props.turns.map((turn, index) => (
            <Turn key={index} totals={turn.totals} />
        ));
        
        return (
            <tbody>{turns}</tbody>
        );
    }
}