const codeSynxModel = require('../models/codeSynx');


exports.homeContol = (req , res) => {
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

exports.codes = async(req,res) => {
    //console.log('yeah');
    try{
        const coder = req.session.user.username;
        const codeList = await codeSynxModel.find({coder : coder});
        res.render('codesynx/codes' , {
            username : req.session.user.username,
            codeList : codeList
        });
    }catch(err){
        console.log(err);
    }
}