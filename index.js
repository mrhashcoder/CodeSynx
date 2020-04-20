//getting  variable
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();



//VARIABLSE ::
const mongoURI = "mongodb+srv://mrhashcoder:mansi8101@node-zafk9.mongodb.net/CodeSynx?retryWrites=true&w=majority";

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

//getting routes
const codeSynxRouter = require("./routes/codesynx");
const authRouter = require('./routes/auth');
const indexRoute = require('./routes/indexRoute');

//using routes

app.use(authRouter);
app.use(indexRoute);
app.use(codeSynxRouter);


//serving static files
app.use(express.static('public'));
app.use(flash());
//setting database

//connecting database
mongoose.connect(mongoURI , {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connectedd');
})
    .catch(err =>{console.log(err)});


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
        io.to(roomId).emit('code' , data);
        //console.log(data);
    });

    socket.on('join' , function(data){
        var roomId = data.synxid;        
        socket.join(roomId);    
                 
    })
});




