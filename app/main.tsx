/// <reference path="../typings/main.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './components/app';
import {Game} from './model/game';

function render() {
    ReactDOM.render(<App game={game} />, document.getElementById('app'));
}

export let game = Game.load(render);

render();