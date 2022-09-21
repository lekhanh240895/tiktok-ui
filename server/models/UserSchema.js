const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: { type: Number },
    first_name: { type: String },
    last_name: { type: String },
    full_name: { type: String },
    nickname: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    tick: { type: Boolean },
    followings_count: { type: Number },
    followers_count: { type: Number },
    likes_count: { type: Number },
    website_url: { type: String },
    facebook_url: { type: String },
    youtube_url: { type: String },
    twitter_url: { type: String },
    instagram_url: { type: String },
    followingIDs: { type: Array },
    followerIDs: { type: Array },
    likedVideoIds: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
