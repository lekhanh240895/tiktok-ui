const VideoSchema = require("../models/VideoSchema");

class VideosController {
  // [GET] /videos
  async getVideos(req, res, next) {
    try {
      const videos = await VideoSchema.find();
      console.log("videos", videos);
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [POST] /videos
  async createVideo(req, res) {
    try {
      const newVideo = req.body;
      const video = new VideoSchema(newVideo);
      await video.save();
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [PUT] /videos/update
  async updateVideo(req, res) {
    try {
      const updateVideo = req.body;
      await VideoSchema.updateOne({ _id: updateVideo._id }, updateVideo);
      res.status(200).json(updateVideo);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

module.exports = new VideosController();
