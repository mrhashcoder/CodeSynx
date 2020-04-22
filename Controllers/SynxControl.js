const codeSynxModel = require('../models/codeSynx');

//new page synx
exports.newCs = (req,res) =>{
    var synxId= getId();
    res.redirect('/' + synxId);
}
//handling any page
exports.codeSynx = async(req,res) =>{    
    try{
        var synxId = req.params.synxId;
        const codeSynx = await codeSynxModel.findOne({synxId : synxId});
        if(codeSynx){
            console.log('yes');
            res.render('codesynx' , {
                synxId : synxId,
                code : codeSynx.code
            })
        }
        else{
            console.log('no');
            const newCodeSynx = new codeSynxModel({
                synxId : synxId,
                code : "hello there"
            });
            await newCodeSynx.save()
            .then(() => {
                res.render('codesynx',{
                    synxId : synxId,
                    code : "hello there"
                });
            })
            
        }
        
    }catch(err){
        console.log(err);
    }
}

function getId() {
    return Math.random().toString(36).substr(3, 5);
};


















function getId() {
    return Math.random().toString(36).substr(3, 5);
};
