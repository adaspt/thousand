import * as React from 'react';
import {GamePlayer} from '../model/game-player';
import {model} from '../main';

interface ICurrentTurnProps {
    players: GamePlayer[];
    scores: number[];
}

interface ICurrentTurnState {
    scores: string[];
}

export class CurrentTurn extends React.Component<ICurrentTurnProps, ICurrentTurnState> {
    constructor(props: ICurrentTurnProps) {
        super(props);
        
        this.state = {
            scores: []
        };
        
        for (let score of this.props.scores) {
            this.state.scores.push(String(score));
        }
    }
    
    componentWillReceiveProps(nextProps) {
        let scores: string[] = [];
        for (let score of nextProps.scores) {
            scores.push(String(score));
        }
        
        this.setState({ scores: scores });
    }
    
    handleScoreChange = (e, index) => {
        let scores = this.state.scores.slice();
        scores[index] = e.target.value;
        this.setState({ scores: scores });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        let scores = this.state.scores
            .map((value) => parseInt(value, 10))
            .map((value) => isNaN(value) ? null : value); 
        model.next(scores);
    }
    
    handleUndo = (e) => {
        model.undo();
    }
    
    render() {
        let scores = this.renderScores();
        
        return (
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <form onSubmit={this.handleSubmit}>
                            {scores}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Next</button>
                                { ' ' }
                                <button type="button" className="btn btn-default" onClick={this.handleUndo}>Undo</button>
                            </div>
                        </form>
                    </td>
                </tr>
            </tfoot>
        );
    }
    
    private renderScores() {
        let colClassNames = this.props.players.length === 3 ? 'col-xs-4' : 'col-xs-3';
        let players = this.props.players;
        
        let inputs = this.state.scores.map((score, index) => {
            let autofocus = index === 0;
            return (
                <div key={index} className={colClassNames}>
                    <div className="form-group">
                        <input type="number" className="form-control text-right" placeholder={players[index].name}
                            min="0" max="1000" step="10" value={score} autoFocus={autofocus}
                            onChange={(e) => this.handleScoreChange(e, index)} />
                    </div>
                </div>
            );
        });
        
        return (
            <div className="row">
                {inputs}
            </div>
        );
    }
}