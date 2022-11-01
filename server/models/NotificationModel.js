const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationModel = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            required: true,
        },
        subType: {
            type: String,
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Notification', NotificationModel);
