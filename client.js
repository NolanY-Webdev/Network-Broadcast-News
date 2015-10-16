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
  console.log(data.toString());
});