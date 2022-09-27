const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const VideoModel = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String },
    src: { type: String },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shares: { type: Array },
    comments: { type: Array },
    music: { type: String },
    tags: { type: Array },
    views: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoModel);
