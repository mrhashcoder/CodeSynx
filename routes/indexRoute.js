const express = require('express');
const router = express.Router();

router.get('/' , (req , res) => {
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
router.post

module.exports = router;