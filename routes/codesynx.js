const express = require('express');

const router = express.Router();

router.get('/codesynx' , (req , res) =>{
    console.log('codesynx visited');
    //res.send('codesynx visited');
    var synxid = Math.floor(1000 + Math.random() * 9000);
    console.log(synxid);
    res.redirect('/' + synxid);
});

router.get('/:synxid',(req,res) =>{
    console.log("synx id page visited");
    res.send("synx id page visited");
    console.log(req.params.synxid);
});

module.exports = router;