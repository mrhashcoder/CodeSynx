exports.homeContol = (req , res) => {
    console.log("hitt");
    if(req.session.isLoggedIn){
        renderData = {
            username : req.session.user.username,
        }
        res.render('index' , renderData);
    }
    else{
        res.render('index');
    }
}

exports.mycodes = (req,res) => {
    
}