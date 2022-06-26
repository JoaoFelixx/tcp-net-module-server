const net = require('net');
const { host, port } = require('./config')

const client = new net.Socket();

client.connect({ port, host },  () => {
  console.log('TCP connection established with the server.');

  client.write('Hello, server.');
});

client.on('data', function (chunk) {
  console.log(`Data received from the server: ${chunk.toString()}.`);
  client.end();
});

client.on('end',  () =>  
  console.log('Requested an end to the TCP connection'));