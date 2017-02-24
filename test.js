const WebSocket = require('ws');

const ws = new WebSocket('ws://67.160.210.50:8080/');

ws.on('open', function open() {
  ws.send('hello world')
});
