var net = require('net');
var PORT = 6969;
var IP = '0.0.0.0';
var sockets = [];

var server = net.createServer(function(socket) {
  console.log('client connected USER ID:' + socket._handle.fd);
  sockets.push(socket);
  var UID = socket._handle.fd;


  socket.on('data', function(data) {
    var i;
    for ( i = 0; i < sockets.length; i++ ) {
      if ( sockets[i] === socket ) continue;
      sockets[i].write('USER: ' + socket._handle.fd + ' ' + data.toString());
    }
  });

  socket.on('end', function() {
    console.log('client disconnected USER: ' + UID);
    var i = sockets.indexOf(socket);
    sockets.splice(i, 1);
    for ( i = 0; i < sockets.length; i++ ) {
      if ( sockets[i] === socket ) continue;
      sockets[i].write('USER: ' + UID + ' has left the channel');
    }

  });

});
server.listen(PORT, function() {
  console.log('server bound');
});


net.createConnection(PORT, IP);