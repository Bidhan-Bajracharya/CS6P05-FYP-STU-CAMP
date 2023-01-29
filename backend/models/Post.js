const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    body: {
        type: String,
        required: [true, "Must provide body content."]
    },
    img: {
        type: String
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema);