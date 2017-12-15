var express = require("express");
var io = require("socket.io")();
var app = express();

app.get("/Blockchain",(req,res) => {
 res.sendFile(__dirname + "/index.html");
});

var hserver = app.listen(8000,() => console.log("Server Started at 8000"));

io.listen(hserver);

io.on('connection',(socket) => {
 console.log("User Connected")
 socket.emit('CustomEvent');
 socket.on('disconnect',() => console.log("User Disconnected"));
 socket.on('getData',() => {
   console.log("getData Called");
   socket.emit('setData',"Data from some DB");
 });
});
