const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageModel = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        text: { type: String, trim: true },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Message', MessageModel);
