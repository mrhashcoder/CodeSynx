const express = require('express');
const router = express.Router();

router.get('/' , (req , res) => {
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
});

module.exports = router;