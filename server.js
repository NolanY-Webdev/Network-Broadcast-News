var net = require('net');
var PORT = 6969;
var IP = '0.0.0.0';
var sockets = [];

var server = net.createServer(function(socket) {
  console.log('client connected USER ID:' + socket._handle.fd);
  sockets.push(socket);
  var userID = socket._handle.fd;
  sockets[sockets.length - 1].userID = userID;
  sockets[sockets.length - 1].write('To change your User ID Type \'RENAME <new name here>\'');

  socket.on('data', function(data) {

    for (var i = 0; i < sockets.length; i++ ) {
      if (data.toString().substring(0, 13) == 'said: RENAME ') {
        var newname = data.toString().slice( 13 );;
        sockets[sockets.indexOf(socket)].userID = newname;
        userID = newname;
      } else {
        if ( sockets[i] === socket ) continue;
        sockets[i].write('USER: ' + userID + ' ' + data.toString());
      }
    }
  });

  socket.on('end', function() {
    console.log('client disconnected USER: ' + userID);
    var i = sockets.indexOf(socket);
    sockets.splice(i, 1);
    for ( i = 0; i < sockets.length; i++ ) {
      if ( sockets[i] === socket ) continue;
      sockets[i].write('USER: ' + userID + ' has left the channel');
    }

  });

});
server.listen(PORT, function() {
  console.log('server bound');
});


net.createConnection(PORT, IP);