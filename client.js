var net = require("net");
var key = "2736465288116483471512847654891679150721";
const socketio = require("socket.io");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
    terminal: false,
});

var client = new net.Socket();

client.connect(8080, '127.0.0.1', () => {
    client.write(key);
});

client.on('data', (data) => {
    if (data.includes("alert")) {
        console.log("\n\n\n\n\n" + data + "\n\n\n\n\n")
    }else {
        console.log(data.toString());
    }
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
