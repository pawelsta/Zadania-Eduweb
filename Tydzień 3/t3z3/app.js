var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var uzytkownicy = [];
	
   server.listen('4000', function() {
	   console.log('listening on localhost:4000');
   });

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('nowy uzytkownik', function(data, callback) {
		if (uzytkownicy.indexOf(data) != -1) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			uzytkownicy.push(socket.nickname);
			updateNicknames();
		}
	});
	
	function updateNicknames() {
			io.sockets.emit('nazwy_uzytkowników', uzytkownicy);
	}
	
	socket.on('wyslij wiadomosc', function(data) {
		io.sockets.emit('nowa wiadomosc', {msg: data, nick: socket.nickname});
	});
	
	socket.on('disconnect', function(data) {
		if(!socket.nickname) return;
		uzytkownicy.splice(uzytkownicy.indexOf(socket.nickname), 1);
		updateNicknames();
	});	
});

