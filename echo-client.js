if (process.argv.length < 3) {
  console.log("Error: requires command line argument for ip adress or domain name.");
  process.exit()
}

url = process.argv[2];

const WebSocket = require('ws');

const ws = new WebSocket('ws://' + url);

ws.on('open', function open() {
  console.log("Sending:  "  + "Hello, server!");
  ws.send("Hello, server!");

  i = 0
  setInterval(function sendMessage() {
    message = "Test Message" + i;
    console.log("Sending:  " + message);
    ws.send(message);
    i += 1
  }, 1000);
});

ws.on('message', function message(data) {
  console.log("Received: " + data);
});

ws.on('error', function error(e) {
  console.log(e);
});

ws.on('close', function close() {
  console.log('Closed...?');
});
