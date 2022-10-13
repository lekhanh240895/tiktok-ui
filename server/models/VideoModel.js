const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        title: { type: String, default: '' },
        privacy: { type: String, default: 'public' },
        cover: { type: String, default: '' },
        allowance: {
            type: Object,
            default: {
                comment: true,
                duet: true,
                stitch: true,
            },
        },
        src: { type: String, default: '' },
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
        music: { type: String, default: '' },
        tags: { type: Array },
        views: { type: Number, default: 0 },
    },
    { timestamps: true },
);

module.exports = mongoose.model('video', VideoModel);
