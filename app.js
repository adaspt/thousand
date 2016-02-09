var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("model/game-player", [], function(exports_1) {
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
            exports_1("GamePlayer", GamePlayer);
        }
    }
});
System.register("model/game-state", [], function(exports_2) {
    "use strict";
    var GameState;
    return {
        setters:[],
        execute: function() {
            (function (GameState) {
                GameState[GameState["Players"] = 1] = "Players";
                GameState[GameState["Game"] = 2] = "Game";
            })(GameState || (GameState = {}));
            exports_2("GameState", GameState);
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
System.register("model/game", ["model/game-state", "model/game-player", "model/game-turn"], function(exports_4) {
    "use strict";
    var game_state_1, game_player_1, game_turn_1;
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
            }],
        execute: function() {
            Game = (function () {
                function Game(render) {
                    this.render = render;
                    this.state = game_state_1.GameState.Players;
                    this.players = [];
                    this.turns = [];
                    this.current = new game_turn_1.GameTurn();
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
                Game.prototype.play = function () {
                    this.state = game_state_1.GameState.Game;
                    this.render();
                };
                return Game;
            }());
            exports_4("Game", Game);
        }
    }
});
System.register("components/player", ['react', "main"], function(exports_5) {
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
                        main_1.model.setPlayer(_this.props.index, e.target.value);
                    };
                }
                Player.prototype.render = function () {
                    var placeholder = this.props.placeholder;
                    var name = this.props.player != null ? this.props.player.name : '';
                    var autofocus = this.props.index === 0;
                    return (React.createElement("div", {className: "form-group"}, React.createElement("input", {className: "form-control", placeholder: placeholder, value: name, autoFocus: autofocus, onChange: this.handleNameChange})));
                };
                return Player;
            }(React.Component));
            exports_5("Player", Player);
        }
    }
});
System.register("components/player-list", ['react', "main", "components/player"], function(exports_6) {
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
                        main_2.model.play();
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
            exports_6("PlayerList", PlayerList);
        }
    }
});
System.register("components/app", ['react', "model/game-state", "components/player-list"], function(exports_7) {
    "use strict";
    var React, game_state_2, player_list_1;
    var App;
    return {
        setters:[
            function (React_3) {
                React = React_3;
            },
            function (game_state_2_1) {
                game_state_2 = game_state_2_1;
            },
            function (player_list_1_1) {
                player_list_1 = player_list_1_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App(props) {
                    _super.call(this, props);
                }
                App.prototype.render = function () {
                    if (this.props.model.state === game_state_2.GameState.Players) {
                        return React.createElement(player_list_1.PlayerList, {players: this.props.model.players});
                    }
                    return (React.createElement("h1", null, "Thousand ", React.createElement("small", null, "Play")));
                };
                return App;
            }(React.Component));
            exports_7("App", App);
        }
    }
});
/// <reference path="../typings/main.d.ts" />
System.register("main", ['react', 'react-dom', "components/app", "model/game"], function(exports_8) {
    "use strict";
    var React, ReactDOM, app_1, game_1;
    var model;
    function render() {
        ReactDOM.render(React.createElement(app_1.App, {model: model}), document.getElementById('app'));
    }
    return {
        setters:[
            function (React_4) {
                React = React_4;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (game_1_1) {
                game_1 = game_1_1;
            }],
        execute: function() {
            exports_8("model", model = new game_1.Game(render));
            render();
        }
    }
});
//# sourceMappingURL=app.js.map