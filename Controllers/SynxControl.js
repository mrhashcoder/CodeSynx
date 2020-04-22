const codeSynxModel = require('../models/codeSynx');

//new page synx
exports.newCs = (req,res) =>{
    var synxId= getId();
    res.redirect('/' + synxId);
}
//handling any page
exports.codeSynx = async(req,res) =>{  
    //console.log(req.session.user.username);  
    try{
        var synxId = req.params.synxId;
        const codeSynx = await codeSynxModel.findOne({synxId : synxId});
        if(codeSynx){            
            //console.log('record already hai');
            if(req.session.isLoggedIn){
                await codeSynxModel.updateOne({synxId : synxId},{coder : req.session.user.username},(err , res) =>{
                    if(err){
                        console.log(err);
                    }
                    //console.log(res);
                });
            }            
            //console.log(codeSynx.coder);
            res.render('codesynx/codesynx' , {
                synxId : synxId,
                code : codeSynx.code,
            })
        }
        else{
            console.log('new record');
            const newCodeSynx = new codeSynxModel({
                synxId : synxId,
                code : "hello there"
            });
            await newCodeSynx.save()
            .then(() => {
                res.render('codesynx/codesynx',{
                    synxId : synxId,
                    code : "hello there",
                    coder : null
                });
            })
            
        }
        
    }catch(err){
        console.log(err);
    }
}

exports.deleteSynx = async(req,res) => {

}

function getId() {
    return Math.random().toString(36).substr(3, 5);
};


















function getId() {
    return Math.random().toString(36).substr(3, 5);
};
