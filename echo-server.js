const http      = require('http');
const WebSocket = require('ws');

const httpServer = http.createServer();
httpServer.listen(31337);

const wss = new WebSocket.Server({
  server: httpServer
});

console.log('Awaiting connections...');

wss.on('connection', function connection(ws) {
  console.log("Connection established!");

  ws.on('message', function incoming(data, flags) {
    console.log( data );
    ws.send( data );
  });
});
