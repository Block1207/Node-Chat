const net = require("net");
const fs  = require("fs");
const socketio = require("socket.io");
const { disconnect } = require("process");
const { Socket } = require("dgram");
const { DH_CHECK_P_NOT_PRIME } = require("constants");
let mistakes = 0;
var sockets = [];
var key = "2736465288116483471512847654891679150721";
var Server = net.createServer();
var active = false;
let slist = fs.readFileSync("swearinglist.txt")
let slist_array = slist.toString().split(",");
var clients = sockets.length;
let sendable = true;


Server.on('connection', (socket) => {

	socket.name = socket.remoteAddress + " | " + socket.remotePort;

	console.log(socket.name +  ' Joined !');

	socket.setEncoding('utf8');

	socket.on('data', (data) => {

		data = data.toLowerCase();

		if (data == key) {
			sockets.push(socket);
		}


		if(active){
			if (sockets.includes(socket)) {
				slist_array.forEach((w) => {
					if(data.includes(w)){
						sendable = false;
						console.log(socket.remotePort + " Wollte  | "+ data + " |  in den chat schrieben !");
						for(var i=0; i < clients;i++){
							if(sockets[i] === socket) continue;
							sockets[i].write(socket.remotePort + " wollte eine beleidigen !")
							mistakes = mistakes + 1;
						}
					}
				});
		
		
				if (mistakes > 2){
					console.log(socket.remotePort + " Wir gekickt !");
					for(var i=0; i < clients;i++){
						if(sockets[i] === socket) {
							sockets[i].write("You got kicked out of the Server !");
							sockets.splice(sockets.indexOf(socket[i]), 1);
							mistakes = 0;
						}else {
							sockets[i].write(socket.remotePort + " Got kicked by the Server!")
						}
					}
				}
		
		
				if(sendable){
					console.log(socket.remotePort + " | " + data);
	
					for(var i=0; i < clients;i++){
						if(sockets[i] === socket) continue;
						sockets[i].write(socket.remotePort + " | " + data);
					}
				}else{
					sendable = true;
				}
			};
		};
	});
	socket.on('end', () => {
		sockets.splice(sockets.indexOf(socket), 1);
	});
});

Server.listen(8080);