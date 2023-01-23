const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the notifying user.'],
    },
    receiver: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        required: [true, 'Please provide the receiving user.'],
    },
    title: {
        type: String,
        required: [true, 'Please provide the title for the notification.'],
    },
    message: {
        type: String,
        required: [true, 'Please provide the message for the notification.']
    },
    readBy: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: undefined
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Notification", NotificationSchema);
