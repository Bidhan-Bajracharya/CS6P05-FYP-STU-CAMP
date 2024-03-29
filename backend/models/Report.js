const mongoose = require('mongoose')

const ReportSchema = mongoose.Schema({
    reportedUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide reported user'],
    },
    
    reportingUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide reporting user'],
    },
    reason: {
        type: String,
        required: [true, 'Please enter a reason.'],
        maxlength: 50, 
    },
    reportedPostId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: [true, 'No post id provided.']
    },
    resolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Report", ReportSchema)