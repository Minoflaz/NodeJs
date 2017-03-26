/**
 * Created by K401LB on 03/03/2017.
 */

var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Serveur : Votre swag est très haut !');

    socket.on('pseudo', function (pseudo) {
        socket.pseudo = pseudo;
        socket.broadcast.emit('message', socket.pseudo + ' joined the chat');
    });

    socket.on('message',function (message) {
        var pseudoMessage = socket.pseudo + ' : ' + message;
        console.log(pseudoMessage);
        socket.emit('message',pseudoMessage);
        socket.broadcast.emit('message',pseudoMessage);
    });
});



server.listen(8080);
console.log('salut');