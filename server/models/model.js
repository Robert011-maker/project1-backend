var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = mongoose.model;

const schema = new Schema({
    id:{
        type: Number,
        default: 1,
        unique: true
    },
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    balance:{
        type:Number
    }
});


schema.pre('save', function(next) {
    if (this.isNew) {
        userdb.countDocuments().then(res => {
            this.id = res + 1; 
            next();
        });
    } else {
        next();
    }
});
var userdb = model('userdb',schema);
module.exports=userdb;