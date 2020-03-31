//getting  variable
const express = require('express');
const socket = require('socket.io');
const app = express();

//getting routes
const codeSynxRouter = require("./routes/codesynx");



//using routes
app.use(codeSynxRouter);



//setting database

//starting server
var server = app.listen('4000' , ()=>{
    console.log('server started at 4000');
})





