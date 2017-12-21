var express = require("express");
var io = require("socket.io")();
var app = express();

app.use(express.static('public'))

app.get("/Blockchain",(req,res) => {
 res.sendFile(__dirname + "/index.html");
});

var hserver = app.listen(8000,() => console.log("Server Started at 8000"));

io.listen(hserver);

io.on('connection',(socket) => {
 console.log("User Connected");

 socket.on('disconnect',() => console.log("User Disconnected"));
 socket.on('blocks',() => {
   console.log("Sending Blocks to the Client");
   socket.emit('getBlocks',"Sending some blocks to the user");
 });
});