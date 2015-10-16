var net = require('net');
var PORT = 6969
var server = net.createServer(function(c) {
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen(PORT, function() {
  console.log('server bound');
});

net.createConnection(PORT, '0.0.0.0');