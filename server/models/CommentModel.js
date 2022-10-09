const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        text: { type: String, trim: true },
        video: {
            type: Schema.Types.ObjectId,
            ref: 'video',
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: 'comment',
        },

        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('comment', CommentModel);
