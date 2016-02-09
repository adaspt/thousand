var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("model/game-state", [], function(exports_1) {
    "use strict";
    var GameState;
    return {
        setters:[],
        execute: function() {
            (function (GameState) {
                GameState[GameState["Players"] = 1] = "Players";
                GameState[GameState["Game"] = 2] = "Game";
            })(GameState || (GameState = {}));
            exports_1("GameState", GameState);
        }
    }
});
System.register("model/game-player", [], function(exports_2) {
    "use strict";
    var GamePlayer;
    return {
        setters:[],
        execute: function() {
            GamePlayer = (function () {
                function GamePlayer() {
                    this.canDrop = true;
                }
                return GamePlayer;
            }());
            exports_2("GamePlayer", GamePlayer);
        }
    }
});
System.register("model/game-turn", [], function(exports_3) {
    "use strict";
    var GameTurn;
    return {
        setters:[],
        execute: function() {
            GameTurn = (function () {
                function GameTurn() {
                }
                return GameTurn;
            }());
            exports_3("GameTurn", GameTurn);
        }
    }
});
System.register("model/game-current-turn", [], function(exports_4) {
    "use strict";
    var GameCurrentTurn;
    return {
        setters:[],
        execute: function() {
            GameCurrentTurn = (function () {
                function GameCurrentTurn(playerCount) {
                    this.scores = [];
                    for (var i = 0; i < playerCount; i++) {
                        this.scores.push(null);
                    }
                }
                return GameCurrentTurn;
            }());
            exports_4("GameCurrentTurn", GameCurrentTurn);
        }
    }
});
System.register("model/game", ["model/game-state", "model/game-player", "model/game-turn", "model/game-current-turn"], function(exports_5) {
    "use strict";
    var game_state_1, game_player_1, game_turn_1, game_current_turn_1;
    var Game;
    return {
        setters:[
            function (game_state_1_1) {
                game_state_1 = game_state_1_1;
            },
            function (game_player_1_1) {
                game_player_1 = game_player_1_1;
            },
            function (game_turn_1_1) {
                game_turn_1 = game_turn_1_1;
            },
            function (game_current_turn_1_1) {
                game_current_turn_1 = game_current_turn_1_1;
            }],
        execute: function() {
            Game = (function () {
                function Game(render) {
                    this.render = render;
                    this.state = game_state_1.GameState.Players;
                    this.players = [];
                    this.turns = [];
                }
                Game.prototype.setPlayer = function (index, name) {
                    var players = [
                        new game_player_1.GamePlayer(),
                        new game_player_1.GamePlayer(),
                        new game_player_1.GamePlayer(),
                        new game_player_1.GamePlayer()
                    ];
                    for (var i = 0; i < 4; i++) {
                        players[i].name = index == i ? name : this.players.length > i ? this.players[i].name : null;
                    }
                    for (var i = 3; i >= 0; i--) {
                        if (players[i].name) {
                            break;
                        }
                        players.pop();
                    }
                    this.players = players;
                    this.render();
                };
                Game.prototype.clear = function () {
                    this.state = game_state_1.GameState.Players;
                    this.turns = [];
                    this.current = null;
                    this.render();
                };
                Game.prototype.play = function () {
                    this.state = game_state_1.GameState.Game;
                    this.current = new game_current_turn_1.GameCurrentTurn(this.players.length);
                    this.render();
                };
                Game.prototype.next = function (scores) {
                    if (scores.every(function (value) { return value == null; })) {
                        return;
                    }
                    var currentScores = this.turns.length > 0 ? this.turns[this.turns.length - 1].totals : [0, 0, 0, 0];
                    var turn = new game_turn_1.GameTurn();
                    turn.scores = scores;
                    turn.totals = scores.map(function (value, index) { return value + currentScores[index]; });
                    this.turns.push(turn);
                    this.current = new game_current_turn_1.GameCurrentTurn(this.players.length);
                    this.render();
                };
                Game.prototype.undo = function () {
                    if (this.turns.length === 0) {
                        return;
                    }
                    var lastTurn = this.turns.pop();
                    var current = new game_current_turn_1.GameCurrentTurn(this.players.length);
                    current.dropped = lastTurn.dropped;
                    for (var i = 0; i < this.players.length; i++) {
                        current.scores[i] = lastTurn.scores[i];
                    }
                    this.current = current;
                    this.render();
                };
                return Game;
            }());
            exports_5("Game", Game);
        }
    }
});
System.register("model", ["model/game", "model/game-state", "model/game-player", "model/game-turn", "model/game-current-turn"], function(exports_6) {
    "use strict";
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_6(exports);
    }
    return {
        setters:[
            function (game_1_1) {
                exportStar_1(game_1_1);
            },
            function (game_state_2_1) {
                exportStar_1(game_state_2_1);
            },
            function (game_player_2_1) {
                exportStar_1(game_player_2_1);
            },
            function (game_turn_2_1) {
                exportStar_1(game_turn_2_1);
            },
            function (game_current_turn_2_1) {
                exportStar_1(game_current_turn_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("components/player", ['react', "main"], function(exports_7) {
    "use strict";
    var React, main_1;
    var Player;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
            Player = (function (_super) {
                __extends(Player, _super);
                function Player(props) {
                    var _this = this;
                    _super.call(this, props);
                    this.handleNameChange = function (e) {
                        main_1.game.setPlayer(_this.props.index, e.target.value);
                    };
                }
                Player.prototype.render = function () {
                    var placeholder = this.props.placeholder;
                    var name = this.props.player != null ? this.props.player.name : '';
                    var required = this.props.index < 3;
                    var autofocus = this.props.index === 0;
                    return (React.createElement("div", {className: "form-group"}, React.createElement("input", {className: "form-control", placeholder: placeholder, value: name, required: required, autoFocus: autofocus, onChange: this.handleNameChange})));
                };
                return Player;
            }(React.Component));
            exports_7("Player", Player);
        }
    }
});
System.register("components/player-list", ['react', "main", "components/player"], function(exports_8) {
    "use strict";
    var React, main_2, player_1;
    var PlayerList;
    return {
        setters:[
            function (React_2) {
                React = React_2;
            },
            function (main_2_1) {
                main_2 = main_2_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            }],
        execute: function() {
            PlayerList = (function (_super) {
                __extends(PlayerList, _super);
                function PlayerList(props) {
                    _super.call(this, props);
                    this.handleSubmit = function (e) {
                        e.preventDefault();
                        main_2.game.play();
                    };
                }
                PlayerList.prototype.render = function () {
                    var player1 = this.props.players.length > 0 ? this.props.players[0] : null;
                    var player2 = this.props.players.length > 1 ? this.props.players[1] : null;
                    var player3 = this.props.players.length > 2 ? this.props.players[2] : null;
                    var player4 = this.props.players.length > 3 ? this.props.players[3] : null;
                    return (React.createElement("div", null, React.createElement("h1", null, "Thousand ", React.createElement("small", null, "Players")), React.createElement("form", {onSubmit: this.handleSubmit}, React.createElement(player_1.Player, {index: 0, player: player1, placeholder: "Player 1"}), React.createElement(player_1.Player, {index: 1, player: player2, placeholder: "Player 2"}), React.createElement(player_1.Player, {index: 2, player: player3, placeholder: "Player 3"}), React.createElement(player_1.Player, {index: 3, player: player4, placeholder: "Player 4"}), React.createElement("div", {className: "form-group"}, React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Play")))));
                };
                return PlayerList;
            }(React.Component));
            exports_8("PlayerList", PlayerList);
        }
    }
});
System.register("components/turn", ['react'], function(exports_9) {
    "use strict";
    var React;
    var Turn;
    return {
        setters:[
            function (React_3) {
                React = React_3;
            }],
        execute: function() {
            Turn = (function (_super) {
                __extends(Turn, _super);
                function Turn() {
                    _super.apply(this, arguments);
                }
                Turn.prototype.render = function () {
                    var scores = this.props.totals.map(function (score, index) { return (React.createElement("td", {key: index, className: "text-center"}, score)); });
                    return (React.createElement("tr", null, scores));
                };
                return Turn;
            }(React.Component));
            exports_9("Turn", Turn);
        }
    }
});
System.register("components/current-turn", ['react', "main"], function(exports_10) {
    "use strict";
    var React, main_3;
    var CurrentTurn;
    return {
        setters:[
            function (React_4) {
                React = React_4;
            },
            function (main_3_1) {
                main_3 = main_3_1;
            }],
        execute: function() {
            CurrentTurn = (function (_super) {
                __extends(CurrentTurn, _super);
                function CurrentTurn(props) {
                    var _this = this;
                    _super.call(this, props);
                    this.handleScoreChange = function (e, index) {
                        var scores = _this.state.scores.slice();
                        scores[index] = e.target.value;
                        _this.setState({ scores: scores });
                    };
                    this.handleSubmit = function (e) {
                        e.preventDefault();
                        var scores = _this.state.scores
                            .map(function (value) { return parseInt(value, 10); })
                            .map(function (value) { return isNaN(value) ? null : value; });
                        main_3.game.next(scores);
                    };
                    this.handleUndo = function (e) {
                        main_3.game.undo();
                    };
                    this.handleNewGame = function () {
                        main_3.game.clear();
                    };
                    this.state = {
                        scores: []
                    };
                    for (var _i = 0, _a = this.props.scores; _i < _a.length; _i++) {
                        var score = _a[_i];
                        this.state.scores.push(String(score));
                    }
                }
                CurrentTurn.prototype.componentWillReceiveProps = function (nextProps) {
                    var scores = [];
                    for (var _i = 0, _a = nextProps.scores; _i < _a.length; _i++) {
                        var score = _a[_i];
                        scores.push(String(score));
                    }
                    this.setState({ scores: scores });
                };
                CurrentTurn.prototype.render = function () {
                    var scores = this.renderScores();
                    return (React.createElement("tfoot", null, React.createElement("tr", null, React.createElement("td", {colSpan: 4}, React.createElement("form", {onSubmit: this.handleSubmit}, scores, React.createElement("div", {className: "form-group"}, React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Next"), ' ', React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.handleUndo}, "Undo"), ' ', React.createElement("button", {type: "button", className: "btn btn-success", onClick: this.handleNewGame}, "New game")))))));
                };
                CurrentTurn.prototype.renderScores = function () {
                    var _this = this;
                    var colClassNames = this.props.players.length === 3 ? 'col-xs-4' : 'col-xs-3';
                    var players = this.props.players;
                    var inputs = this.state.scores.map(function (score, index) {
                        var autofocus = index === 0;
                        return (React.createElement("div", {key: index, className: colClassNames}, React.createElement("div", {className: "form-group"}, React.createElement("input", {type: "number", className: "form-control text-right", placeholder: players[index].name, min: "0", max: "1000", step: "10", value: score, autoFocus: autofocus, onChange: function (e) { return _this.handleScoreChange(e, index); }}))));
                    });
                    return (React.createElement("div", {className: "row"}, inputs));
                };
                return CurrentTurn;
            }(React.Component));
            exports_10("CurrentTurn", CurrentTurn);
        }
    }
});
System.register("components/turn-list", ['react', "components/turn", "components/current-turn"], function(exports_11) {
    "use strict";
    var React, turn_1, current_turn_1;
    var TurnList;
    return {
        setters:[
            function (React_5) {
                React = React_5;
            },
            function (turn_1_1) {
                turn_1 = turn_1_1;
            },
            function (current_turn_1_1) {
                current_turn_1 = current_turn_1_1;
            }],
        execute: function() {
            TurnList = (function (_super) {
                __extends(TurnList, _super);
                function TurnList() {
                    _super.apply(this, arguments);
                }
                TurnList.prototype.render = function () {
                    var players = this.renderPlayers();
                    var turns = this.renderTurns();
                    return (React.createElement("table", {className: "table"}, players, turns, React.createElement(current_turn_1.CurrentTurn, {players: this.props.players, scores: this.props.current.scores})));
                };
                TurnList.prototype.renderPlayers = function () {
                    var colClassNames = this.props.players.length === 3 ? 'col-xs-4' : 'col-xs-3';
                    colClassNames += ' text-center';
                    var players = this.props.players.map(function (player, index) { return (React.createElement("th", {key: index, className: colClassNames}, player.name)); });
                    return (React.createElement("thead", null, React.createElement("tr", null, players)));
                };
                TurnList.prototype.renderTurns = function () {
                    var turns = this.props.turns.map(function (turn, index) { return (React.createElement(turn_1.Turn, {key: index, totals: turn.totals})); });
                    return (React.createElement("tbody", null, turns));
                };
                return TurnList;
            }(React.Component));
            exports_11("TurnList", TurnList);
        }
    }
});
System.register("components/game", ['react', "components/turn-list"], function(exports_12) {
    "use strict";
    var React, turn_list_1;
    var Game;
    return {
        setters:[
            function (React_6) {
                React = React_6;
            },
            function (turn_list_1_1) {
                turn_list_1 = turn_list_1_1;
            }],
        execute: function() {
            Game = (function (_super) {
                __extends(Game, _super);
                function Game() {
                    _super.apply(this, arguments);
                }
                Game.prototype.render = function () {
                    var players = this.props.players;
                    var turns = this.props.turns;
                    var current = this.props.current;
                    return (React.createElement("div", null, React.createElement("h1", null, "Thousand ", React.createElement("small", null, "Play")), React.createElement(turn_list_1.TurnList, {players: players, turns: turns, current: current})));
                };
                return Game;
            }(React.Component));
            exports_12("Game", Game);
        }
    }
});
System.register("components/app", ['react', "model", "components/player-list", "components/game"], function(exports_13) {
    "use strict";
    var React, model, player_list_1, game_2;
    var App;
    return {
        setters:[
            function (React_7) {
                React = React_7;
            },
            function (model_1) {
                model = model_1;
            },
            function (player_list_1_1) {
                player_list_1 = player_list_1_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App() {
                    _super.apply(this, arguments);
                }
                App.prototype.render = function () {
                    var players = this.props.game.players;
                    var turns = this.props.game.turns;
                    var current = this.props.game.current;
                    if (this.props.game.state === model.GameState.Players) {
                        return React.createElement(player_list_1.PlayerList, {players: players});
                    }
                    return (React.createElement(game_2.Game, {players: players, turns: turns, current: current}));
                };
                return App;
            }(React.Component));
            exports_13("App", App);
        }
    }
});
/// <reference path="../typings/main.d.ts" />
System.register("main", ['react', 'react-dom', "components/app", "model/game"], function(exports_14) {
    "use strict";
    var React, ReactDOM, app_1, game_3;
    var game;
    function render() {
        ReactDOM.render(React.createElement(app_1.App, {game: game}), document.getElementById('app'));
    }
    return {
        setters:[
            function (React_8) {
                React = React_8;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (game_3_1) {
                game_3 = game_3_1;
            }],
        execute: function() {
            exports_14("game", game = new game_3.Game(render));
            render();
        }
    }
});
//# sourceMappingURL=app.js.map