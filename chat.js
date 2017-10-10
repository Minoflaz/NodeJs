/**
 * Created by alexis on 10/10/2017.
 */
var socket = io.connect('http://localhost:8080');
var pseudo = prompt('Votre pseudo : ');
socket.emit('pseudo',pseudo);

socket.on('message', function (message) {
    var chat = $('#chat');
    chat.append('<tr><td>' + message +'</td></tr>');
});

function emitMessage() {
    var message = $('#message');
    var text = message.val();
    socket.emit('message',text);
    message.val('');
}

//Envoi du message avec enter ou au clique
$('#send').click( function () {
    emitMessage()
});
onkeydown = function (event) {if(event.keyCode == 13)emitMessage()}