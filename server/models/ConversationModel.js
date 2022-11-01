const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationModel = new Schema(
    {
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        title: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Conversation', ConversationModel);
