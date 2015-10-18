var net = require('net');
var PORT = 6969;
var HOST = '0.0.0.0';
var user = '';
var client = new net.Socket();
client.connect({ port : PORT, host : HOST },
  function() {
    console.log('connected to ' + HOST + ':' + PORT);

    process.stdin.on('data', function(data) {
      console.log('sent: ' + data);
      client.write('said: ' + data);
    });
  });

client.on('data', function(data) {
  if (data.toString().substring(0, 8) == '[ADMIN]:') {
    console.log('\x1b[31m%s\x1b[0m ', data );
  } else {
    console.log(data.toString());
  }
});