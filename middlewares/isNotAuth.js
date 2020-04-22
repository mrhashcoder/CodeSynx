module.exports = (req,res,next) => {
    if(req.user){
        if(req.session.isLoggedIn){
           return res.redirect('/');
        }
        else{
            next();
        }
    }
    next();
}