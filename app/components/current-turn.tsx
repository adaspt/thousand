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
        let dropped: number = nextProps.dropped;
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
        let drops = this.renderDrops();
        
        return (
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <form onSubmit={this.handleSubmit}>
                            {scores}
                            {drops}
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
        let colClassName = this.props.players.length === 3 ? 'col-xs-4' : 'col-xs-3';
        let players = this.props.players;
        
        let inputs = this.state.scores.map((score, index) => {
            let autofocus = index === 0;
            let cssGroupClassNames = players[index].isRestricted ? 'has-error' : null;
            
            return (
                <div key={index} className={colClassName}>
                    <div className={cssGroupClassNames}>
                        <input type="number" className="form-control text-right" placeholder={players[index].name}
                            min="-1000" max="1000" step="10" value={score} autoFocus={autofocus}
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
    
    private renderDrops() {
        let colClassName = this.props.players.length === 3 ? 'col-xs-4' : 'col-xs-3';

        let drops = this.props.players.map((player, index) => {
            let checked = this.state.dropped === index;
            let disabled = !player.canDrop;
            return (
                <div key={index} className={colClassName}>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => this.handleDropped(e, index)} /> Drop
                        </label>
                    </div>
                </div>
            );
        });
        
        return (
            <div className="row">
                {drops}
            </div>
        );
    }
}