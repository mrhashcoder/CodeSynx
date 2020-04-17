const User =  require('../models/user');
const bcrypt = require('bcrypt');


//POST CONTROLLERSS

exports.postSignup = async (req , res ,next ) =>{
    const body = req.body;
    //console.log(body);
    var username = body.username;
    var email = body.email;
    var password = body.password;
    
    try{
        const ifUserAvail = await User.findOne({email : email});

        if(ifUserAvail){
            console.log('email used!!');
            res.redirect('/signup');
        }
        else{
            const hashedPassword =  await bcrypt.hash(password , 12);
            const user  = new User({
                username : username,
                email : email,
                password : hashedPassword
            });
            await user.save();            
            res.redirect('/login');
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