'use strict';

let express = require('express');
let app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/app.js', function (req, res) {
    res.sendFile(__dirname + '/public/app.js');
});

let port = process.env.PORT || 8080;
let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    
    console.log('Listening as http://%s:%s', host, port);
});