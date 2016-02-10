import * as React from 'react';
import * as model from '../model'
import {game} from '../main';

interface ICurrentTurnProps {
    players: model.GamePlayer[];
    scores: number[];
    dropped: number;
}

interface ICurrentTurnState {
    scores?: string[];
    dropped?: number;
}

export class CurrentTurn extends React.Component<ICurrentTurnProps, ICurrentTurnState> {
    constructor(props: ICurrentTurnProps) {
        super(props);
        
        this.state = {
            scores: [],
            dropped: this.props.dropped
        };
        
        for (let score of this.props.scores) {
            this.state.scores.push(String(score));
        }
    }
    
    componentWillReceiveProps(nextProps) {
        let dropped: number = nextProps.dropped || null;
        let scores: string[] = [];
        for (let score of nextProps.scores) {
            scores.push(String(score));
        }
        
        this.setState({ scores: scores, dropped: dropped });
    }
    
    handleScoreChange = (e, index) => {
        let scores = this.state.scores.slice();
        scores[index] = e.target.value;
        this.setState({ scores: scores });
    }
    
    handleDropped = (e, index) => {
        let scores: string[] = [];
        let dropped: number = e.target.checked ? index : null;
        
        for (let i = 0; i < this.props.players.length; i++) {
            if (dropped === null || dropped === i || this.props.players[i].isRestricted) {
                scores.push(null);
            } else {
                scores.push(String(120 / (this.props.players.length - 1)));
            }
        }
        
        this.setState({ scores: scores, dropped: dropped });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        let scores = this.state.scores
            .map((value) => parseInt(value, 10))
            .map((value) => isNaN(value) ? null : value); 
        game.next(scores, this.state.dropped);
    }
    
    handleUndo = (e) => {
        game.undo();
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
            let checked = this.state.dropped === index;
            let disabled = !players[index].canDrop;
            let cssGroupClassNames = 'form-group';
            if (players[index].isRestricted) {
                cssGroupClassNames += ' has-error';
            }
            
            return (
                <div key={index} className={colClassNames} style={{ paddingLeft: 7, paddingRight: 7 }}>
                    <div className={cssGroupClassNames}>
                        <div className="input-group">
                            <span className="input-group-addon">
                                <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => this.handleDropped(e, index)} />
                            </span>
                            <input type="number" className="form-control text-right" placeholder={players[index].name}
                                min="-1000" max="1000" step="10" value={score} autoFocus={autofocus}
                                onChange={(e) => this.handleScoreChange(e, index)} />
                        </div>
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