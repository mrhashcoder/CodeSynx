const User =  require('../models/user');
const bcrypt = require('bcrypt');


//POST CONTROLLERSS

exports.postSignup = async (req , res ,next ) =>{

}

exports.postLogin = async (req , res , next) =>{

}





//GET CONTROLLERSS
exports.getSignup = (req , res) => {
    res.render('signup' , {
        isLoggedIn : false,
        pageTitle : "Signup"
    });
}

exports.getLogin = (req ,res) => {
    res.render('login' , {
        pageTitle:'Login',
        isLoggedIn : false
    });   
}