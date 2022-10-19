const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageModel = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },

        text: { type: String, trim: true },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'conversation',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('message', MessageModel);
