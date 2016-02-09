import * as React from 'react';

interface ITurnProps {
    totals: number[];
}

interface ITurnState {
}

export class Turn extends React.Component<ITurnProps, ITurnState> {
    render() {
        let scores = this.props.totals.map((score, index) => (
            <td key={index} className="text-center">{score}</td>
        ));
        
        return (
            <tr>{scores}</tr>
        );
    }
}