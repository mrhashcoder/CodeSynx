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