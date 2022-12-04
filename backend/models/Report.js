const mongoose = require('mongoose')

const ReportSchema = mongoose.Schema({
    reportedUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide reported user'],
    },
    reportingUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide reporting user'],
    },
    reason: {
        type: String,
        required: [true, 'Please enter a reason.'],
        maxlength: 50, 
    },
    resolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model("Report", ReportSchema)