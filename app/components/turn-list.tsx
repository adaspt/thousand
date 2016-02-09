import * as React from 'react';
import * as model from '../model'

import {Turn} from './turn';
import {CurrentTurn} from './current-turn';

interface ITurnListProps {
    players: model.GamePlayer[];
    turns: model.GameTurn[];
    current: model.GameCurrentTurn;
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
                <CurrentTurn players={this.props.players} scores={this.props.current.scores} dropped={this.props.current.dropped} />
            </table>
        );
    }
    
    private renderPlayers() {
        let colClassNames = this.props.players.length === 3 ? 'col-xs-4' : 'col-xs-3';
        colClassNames += ' text-center';
        
        let players = this.props.players.map((player, index) => {
            let dropMark = player.canDrop ? '' : ' *';
            return (
                <th key={index} className={colClassNames}>{player.name}{dropMark}</th>
            );
        });
        
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