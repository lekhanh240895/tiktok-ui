const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    id: { type: Number },
    userId: { type: Number },
    title: { type: String },
    src: { type: String },
    likes: { type: Array },
    shares: { type: Array },
    comments: { type: Array },
    music: { type: String },
    tags: { type: Array },
    views: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
