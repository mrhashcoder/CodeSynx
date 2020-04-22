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
const codeSynxModel = require('./models/codeSynx');
const app = express();
dotenv.config();

//VARIABLSE ::
const mongoURI = process.env.mongoURI;
const PORT = process.env.PORT;
//console.log(process.env.Session_secret);

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended : true}));


//SETTING SESSION
const store = new sessionStore({
    uri : mongoURI,
    collection : 'sessions'
});
app.use(session({
    secret : process.env.Session_secret,
    resave : false,
    saveUninitialized : false, 
    store : store
}))

app.use((req , res , next) => {
    if(!req.session.user){
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

//getting routes

const homeRoute = require('./routes/home');
const codeSynxRouter = require("./routes/codesynx");
const authRouter = require('./routes/auth');


//using routes

app.use(homeRoute);
app.use(authRouter);
app.use(codeSynxRouter);

//connecting database
mongoose.connect(mongoURI , {
    useCreateIndex: true,
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
    console.log('dataBase connected!!');
})
    .catch(err =>{console.log(err)});


//starting server
var server = app.listen(PORT, ()=>{
    console.log('server started at ' +  PORT);
});



var io = socket(server);
io.on('connection' , function(socket){
    //console.log(socket.request);
    //console.log('connected');
    socket.on('code' , function(data){
        //console.log('change');
        var roomId = data.synxId;
        io.to(roomId).emit('code' , data);
        //console.log(data);
    });

    socket.on('join' , function(data){        
        var roomId = data.synxid;        
        socket.join(roomId);   
                 
    });

    socket.on('save' ,async function(data){
        //console.log('save');
        var synxId = data.synxId;
        var myquery = {synxId : synxId};
        var change = {code : data.code};
        const codeSynx = await codeSynxModel.updateOne(myquery , change , function(err, res){
            if(err){
                console.log(err);
            }
        });
        
    });
});



