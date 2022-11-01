const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a username!'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email!'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password!'],
        },
        followings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
        },
        first_name: { type: String, default: '' },
        last_name: { type: String, default: '' },
        full_name: { type: String, default: '' },
        avatar: { type: String, default: '' },
        birthday: { type: String, default: '' },
        bio: { type: String, default: '' },
        tick: { type: Boolean, default: false },
        website_url: { type: String, default: '' },
        facebook_url: { type: String, default: '' },
        youtube_url: { type: String, default: '' },
        twitter_url: { type: String, default: '' },
        instagram_url: { type: String, default: '' },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', UserModel);
