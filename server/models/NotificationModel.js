const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationModel = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'user',
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
            ref: 'video',
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'comment',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('notification', NotificationModel);
