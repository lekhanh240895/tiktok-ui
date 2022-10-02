const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoModel = new Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: { type: String },
        privacy: { type: String, default: 'public' },
        cover: { type: String },
        allowance: { trype: Object },
        src: { type: String },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        shares: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        comments: { type: Array },
        music: { type: String },
        tags: { type: Array },
        views: { type: Number },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Video', VideoModel);
