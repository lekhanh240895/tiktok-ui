const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        text: { type: String, trim: true },
        video: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],

        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Comment', CommentModel);
