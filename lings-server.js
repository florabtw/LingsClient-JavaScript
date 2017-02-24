const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080
});

console.log('Running!');

x = 0
y = 0
foods = 2

mapMessage = { type: 'map', columns: 4, rows: 4, map: '****************' }
entityMessage = { type: 'agent', id: 0, x: 0, y: 0 }
idMessage = { type: 'id', id: 0 }
farFoodMessage = { type: 'food', x: 0, y: 3 }
closeFoodMessage = { type: 'food', x: 2, y: 0 }

wss.on('connection', function connection(ws) {
  console.log("Connection established!");
  ws.send(JSON.stringify(mapMessage));
  ws.send(JSON.stringify(entityMessage));
  ws.send(JSON.stringify(idMessage));
  ws.send(JSON.stringify(farFoodMessage));
  ws.send(JSON.stringify(closeFoodMessage));

  ws.on('message', function incoming(data, flags) {
    console.log(data);
    json = JSON.parse(data);

    ws.send(data);

    if (json.type == 'eat') {
      foods -= 1

      if (foods == 0) {
        setTimeout(function() {
          ws.send(JSON.stringify({
            type: 'food',
            x: Math.floor(Math.random() * 4),
            y: Math.floor(Math.random() * 4)
          }));
          foods += 1
        }, 2000);
      }
    }
  });
});
