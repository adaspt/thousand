import * as React from 'react';
import {GamePlayer} from '../model/game-player'
import {model} from '../main';

interface IPlayerProps {
    index: number;
    player: GamePlayer;
    placeholder: string;
}

interface IPlayerState {
}

export class Player extends React.Component<IPlayerProps, IPlayerState> {
    constructor(props) {
        super(props);
    }
    
    handleNameChange = (e) => {
        model.setPlayer(this.props.index, e.target.value);
    }
    
    render() {
        let placeholder = this.props.placeholder;
        let name = this.props.player != null ? this.props.player.name : '';
        let required = this.props.index < 3;
        let autofocus = this.props.index === 0;
        
        return (
            <div className="form-group">
                <input className="form-control" placeholder={placeholder} value={name} required={required} autoFocus={autofocus} onChange={this.handleNameChange} />
            </div>);
    }
}
