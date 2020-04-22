const User =  require('../models/User');
const bcrypt = require('bcrypt');

//POST CONTROLLERSS

exports.postSignup = async (req , res ,next ) =>{
    const body = req.body;
    //console.log(body);
    var {username , email , password} = body;
    console.log(username , email , password);
    try{
        const ifUserAvail = await User.findOne({username : username});
        const ifEmailAvail = await User.findOne({email : email});

        if(ifUserAvail){
            console.log('username used!!');
            res.redirect('/signup');
        }
        else if(ifEmailAvail){
            console.log('Email Used!!');
            res.redirect('/signup');
        }
        else{
            bcrypt.hash(password , 12)
            .then(hashedPassword => {
                const newUser = new User({
                    username : username,
                    email : email , 
                    password : hashedPassword
                })
                return newUser.save();
            })
            .then(result => {
                res.redirect('/login');
            })
        }
    }
    catch(err){
        console.log(err);
        res.redirect('/');
    }
    
}

exports.postLogin = async (req , res , next) =>{
    var email = req.body.email;
    var password = req.body.password;
    //console.log('reach 1');
    try{
        var user = await User.findOne({email : email});
        if(!user){
            console.log("user not found!!1");
            res.redirect('/login');
        }
        else{
            const passwordMatch = await bcrypt.compare(password , user.password);
            if(!passwordMatch){
                console.log('incorrect password');
                res.redirect('/login');
            }
            else{
              //  console.log('password matchedd');
                //console.log(req.session);
              
                req.session.user = user;
                req.session.isLoggedIn = true;
                req.session.save();
                //console.log(req.session);
                res.redirect('/');
            }
        }
        
    }catch(err){
        console.log(err);
        res.redirect('/login');
    }
}

exports.postLogout = (req , res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    })
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


function validateLogin(req){
    var email = req.body.email;
    var password = req.body.password;

    if(password)
        return 0 ;
    if(email)
        return 0;
    
    return 1;
}