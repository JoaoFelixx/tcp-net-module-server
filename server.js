const net = require('net');
const { port } = require('./config');
const connections = [];
const server = new net.Server();

server.listen(port, () => console.log(`Server listening for requests on localhost:${port}`));

server.on('connection', function (socket) {
  connections.push(socket)

  socket.on('data', (chunk) =>
    connections.forEach(connection => {
      if (connection === socket)
        return

      connection.write(chunk)
    })
  )

  socket.on('end', () =>
    console.log('Closing connection with the client'));

  socket.on('error', (err) =>
    console.log(`Error: ${err}`));
});