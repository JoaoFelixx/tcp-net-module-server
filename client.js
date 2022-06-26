const net = require('net');
const readline = require('readline')
const { stdin, stdout } = require('process');
const { host, port } = require('./config')

const client = new net.Socket();

client.connect({ port, host }, () =>
  console.log('TCP connection established with the server.'));

client.on('data', (chunk) =>
  console.log(`Data received from the server: ${chunk.toString()}.`));

client.on('end', () =>
  console.log('Requested an end to the TCP connection'));

const writer = readline.createInterface({
  input: stdin,
  output: stdout,
})

writer.on('line', (message) => {
  if (message === '.exit')
    client.end();

  client.write(message);
})