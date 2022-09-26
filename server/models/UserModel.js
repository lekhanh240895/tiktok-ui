const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username!"],
    },
    email: {
      type: String,
      required: [true, "Please add an email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password!"],
    },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    full_name: { type: String, default: "" },
    avatar: { type: String, default: "" },
    birthday: { type: String, default: "" },
    bio: { type: String, default: "" },
    tick: { type: Boolean, default: false },
    followings_count: { type: Number },
    followers_count: { type: Number },
    likes_count: { type: Number },
    website_url: { type: String, default: "" },
    facebook_url: { type: String, default: "" },
    youtube_url: { type: String, default: "" },
    twitter_url: { type: String, default: "" },
    instagram_url: { type: String, default: "" },
    followingIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followerIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likedVideoIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserModel);
