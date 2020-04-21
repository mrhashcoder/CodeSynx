//getting  variable
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const sessionStore = require('connect-mongodb-session')(session);
const User = require('./models/User');
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


//SETTING SESSION
const store = new sessionStore({
    uri : mongoURI,
    collection : 'sessions'
});
app.use(session({
    secret : process.env.Session_secret,
    resave : true,
    saveUninitialized:true, 
    store : store
}))

app.use((req , res , next) => {
    if(!req,session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        if(!user){
            return next();
        }
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
        return next();
    });
})

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    //res.locals.csrfToken = req.csrfToken();
    if(req.user){
        res.locals.email = req.user.email;
    }
    next();
});

//serving static files
app.use(express.static('public'));
app.use(flash());
//setting database

//using routes

app.use(authRouter);
app.use(indexRoute);
app.use(codeSynxRouter);


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




