const express = require('express');

const router = express.Router();

router.get('/cs' , (req , res) =>{
    var synxid = getId();
    res.redirect('/' + synxid);
});

router.get('/:synxid',(req,res) =>{
    var synxid = req.params.synxid;
    res.render('../views/codesynx' , {
        "synxid" : synxid
    });
});

function getId() {
    return Math.random().toString(36).substr(3, 5);
};

module.exports = router;