//getting  variable
const express = require('express');
const socket = require('socket.io');
const app = express();

app.set('view engine' , 'ejs');


//getting routes
const codeSynxRouter = require("./routes/codesynx");



//using routes
app.use(codeSynxRouter);


//serving static files
app.use(express.static('scripts'));

//setting database

//starting server
var server = app.listen('4000' , ()=>{
    console.log('server started at 4000');
});

//settings sockets

var io = socket(server);

io.on('connection' , function(socket){
    //console.log("made a connection :" + socket.id);
    socket.on('code' , function(data){
        var roomId = data.synxid;
        socket.join(roomId);
        io.to(roomId).emit('code' , data);
        console.log(data);
    });
});




