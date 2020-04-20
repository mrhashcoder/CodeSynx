//getting  variable
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const sessionStore = require('connect-mongodb-session')(session);
const app = express();
dotenv.config();

//VARIABLSE ::
const mongoURI = process.env.mongoURI;
const PORT = process.env.PORT;
console.log(process.env.Session_secret);

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

//SETTING SESSION
const store = new sessionStore({
    uri : mongoURI,
    collection : 'sessions'
});
app.use(session({
    secret : process.env.Session_secret,
    resave : false,
    saveUninitialized:false, 
    store : store
}))

//serving static files
app.use(express.static('public'));
app.use(flash());
//setting database

//connecting database
mongoose.connect(mongoURI , {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
})
    .catch(err =>{console.log(err)});


//starting server
var server = app.listen(PORT, ()=>{
    console.log('server started at ' +  PORT);
});


//settings sockets


var io = socket(server);
io.on('connection' , function(socket){
    //console.log("made a connection :" + socket.id);
    socket.on('code' , function(data){
        var roomId = data.synxid;
        io.to(roomId).emit('code' , data);
        console.log(data);
    });

    socket.on('join' , function(data){
        console.log(data);
        var roomId = data.synxid;        
        socket.join(roomId);   
                 
    })
});




