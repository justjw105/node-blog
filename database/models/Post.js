const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:String,
    description: String,
    content: String,
    image: String,
    createdAt:{
        type: Date,
        default: new Date()
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
