const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codeSynxSchema = new Schema({ 
    coder : {
        type : String
    },
    synxId : {
        type : String,
        required : true,
        unique : true
    },
    code:{
        type:String,
        required:false
    },
},{timestamps : true});
codeSynxSchema.index({createdAt: 1},{expireAfterSeconds : 86400 });

module.exports = mongoose.model('codeSave' , codeSynxSchema);