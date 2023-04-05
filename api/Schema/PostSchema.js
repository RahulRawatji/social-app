const mongoose = require('mongoose');

const {Schema} = mongoose;

const PostSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    summary:{
        type:String,
        require:true,
    },
    content:{
        type:String
    },
    cover:{
        type:String
    }
},{
    timestamps:true
})

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;