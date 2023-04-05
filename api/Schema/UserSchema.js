const mongoose =  require('mongoose');

const {Schema, model} = mongoose;

const UserScheme = new Schema({
    email:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

});

const UserModal = model('User', UserScheme);

module.exports = UserModal;