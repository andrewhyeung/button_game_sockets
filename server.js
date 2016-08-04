var express = require('express'); 
var path =require('path');
var app = express(); 

app.set('views', path.join(__dirname, './views')); 

app.set('view engine', 'ejs'); 

app.get('/', function(req, res){
	res.render('index');
})

var server = app.listen(8000, function(){
	console.log('listening on port 8000'); 
})

var io = require('socket.io').listen(server)
var count = 0;
io.sockets.on('connection', function(socket){
	console.log('we are using sockets'); 

	socket.on('button_clicked', function(data){
		count += data.click
		console.log(count);
		socket.emit('message', {response: 'The button has been pushed '+ count + ' times'})
	})

	socket.on('reset_clicked', function(data){
		count = data.click
		socket.emit('message', {response: 'The button has been pushed '+ count + ' times'})
	})

	socket.emit('message', {response: 'The button has been pushed '+ count + ' times'})

})