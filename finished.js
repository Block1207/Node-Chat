var net = require("net");
const socketio = require("socket.io");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
    terminal: false,
});

var client = new net.Socket();

client.connect(8080, '217.160.171.107', () => {
    client.write(" Joined !")
});

client.on('data', (data) => {
	console.log(data.toString());
});

client.on('close', () => {
	console.log('Connection closed');
    process.exit(); 
});

rl.prompt();
rl.on('line', (input) => {
    client.write(input)
    rl.prompt();
});
