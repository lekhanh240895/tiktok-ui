const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        title: { type: String },
        privacy: { type: String, default: 'public' },
        cover: { type: String },
        allowance: {
            type: Object,
            default: {
                comment: true,
                duet: true,
                stitch: true,
            },
        },
        src: { type: String },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        shares: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'comment',
            },
        ],
        music: { type: String },
        tags: { type: Array },
        views: { type: Number },
    },
    { timestamps: true },
);

module.exports = mongoose.model('video', VideoModel);
