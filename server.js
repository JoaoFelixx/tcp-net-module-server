const net = require('net');
const { port } = require('./config');

const server = new net.Server();

server.listen(port, () => console.log(`Server listening for requests on localhost:${port}`));

server.on('connection', function (socket) {
  socket.write('Hello, client.');

  socket.on('data', (chunk) =>
    console.log(`Data received from client: ${chunk.toString()}`));

  socket.on('end', () =>
    console.log('Closing connection with the client'));

  socket.on('error', (err) =>
    console.log(`Error: ${err}`));
});