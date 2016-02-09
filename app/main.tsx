/// <reference path="../typings/main.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './components/app';
import {Game} from './model/game';

function render() {
    ReactDOM.render(<App model={model} />, document.getElementById('app'));
}

export let model = new Game(render);

render();