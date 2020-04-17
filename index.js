//getting  variable
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const app = express();


//VARIABLSE ::
const mongoURI = "mongodb+srv://mrhashcoder:mansi8101@node-zafk9.mongodb.net/CodeSynx?retryWrites=true&w=majority";

app.set('view engine' , 'ejs');


//getting routes
const codeSynxRouter = require("./routes/codesynx");
const authRouter = require('./routes/auth');


//using routes

app.use(authRouter);
app.use(codeSynxRouter);


//serving static files
app.use(express.static('scripts'));

//setting database

//connecting database
mongoose.connect(mongoURI , {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then( console.log("database connected") );


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
        //console.log(data);
    });
});




