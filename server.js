var net = require('net');
var PORT = 6969;
var IP = '0.0.0.0';
var sockets = [];

//RED WORDS console.log('\x1b[31m%s\x1b[0m: ', 'words');


var server = net.createServer(function(socket) {
  console.log('client connected USER ID:' + socket._handle.fd);
  sockets.push(socket);
  var userID = socket._handle.fd;
  sockets[sockets.length - 1].userID = userID;
  sockets[sockets.length - 1].write('Welcome to the chat thingy! Connected as User: ' + userID + ' To change your User ID Type \'RENAME <new name here>\'');

  socket.on('data', function(data) {

    if (data.toString().substring(0, 13) == 'said: RENAME ') {
      var newname = data.toString().slice( 13 );
      if (newname.toLowerCase().indexOf('admin') !== -1) {
        sockets[sockets.indexOf(socket)].userID = 'I tried to pose as an admin and all I got was this shitty username';
        userID = 'I tried to pose as an admin and all I got was this shitty username';
        sockets[sockets.length - 1].write('Names containing \'admin\' are not allowed');
      } else {
        sockets[sockets.indexOf(socket)].userID = newname;
        userID = newname;
      }
      socket.write('Rename successfully set. Your new name is ' + userID);

    } else {
      for (var i = 0; i < sockets.length; i++ ) {
        if ( sockets[i] === socket ) continue;
        sockets[i].write('USER: ' + userID + ' ' + data.toString());
      }
    }

  });



//BROKEN
  process.stdin.on('data', function(data) {
    var adminWords = data.toString();
    var adminToClient = ('\x1b[31m%s\x1b[0m: ', ('[ADMIN]: ' + adminWords));
    console.log('\x1b[31m%s\x1b[0m: ', adminWords);
    socket.write('\x1b[31m%s\x1b[0m: ', adminToClient);
  });
//BROKEN

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