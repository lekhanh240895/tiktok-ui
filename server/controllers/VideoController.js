const VideoModel = require("../models/VideoModel");

class VideosController {
  // [GET] /videos
  async getVideos(req, res, next) {
    try {
      const videos = await VideoModel.find();
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [GET] /videos/:id
  async getVideo(req, res, next) {
    try {
      const videos = await VideoModel.findById(req.params.id);
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [POST] /videos
  async createVideo(req, res) {
    try {
      const video = new VideoModel({
        ...req.body,
        userID: req.user._id,
      });

      await video.save();
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [PUT] /videos/:id/update
  async updateVideo(req, res) {
    try {
      const video = await VideoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [DELETE] /videos/:id/delete
  async deleteVideo(req, res) {
    try {
      const deleteVideo = await VideoModel.findByIdAndDelete(req.body.id);
      res.status(200).json(req.body.id);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

module.exports = new VideosController();
