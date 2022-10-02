const VideoModel = require('../models/VideoModel');

class VideosController {
    // [GET] /videos
    async getVideos(req, res, next) {
        try {
            const videos = await VideoModel.find();
            res.status(200).json(videos);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [GET] /videos/:id
    async getVideo(req, res, next) {
        try {
            const videos = await VideoModel.findById(req.params.id);
            res.status(200).json(videos);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [POST] /videos
    async createVideo(req, res, next) {
        try {
            const video = new VideoModel({
                ...req.body,
                userID: req.user._id,
            });

            await video.save();
            res.status(200).json(video);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [PUT] /videos/:id/update
    async updateVideo(req, res, next) {
        try {
            const video = await VideoModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            res.status(200).json(video);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [PUT] /videos/:id/like
    async likeVideo(req, res, next) {
        try {
            const video = await VideoModel.findById(req.params.id);
            if (!video.likes.includes(req.user.id)) {
                await video.updateOne({
                    $push: { likes: req.user.id },
                });
                res.status(200).json(video);
            } else {
                await video.updateOne({
                    $pull: { likes: req.user.id },
                });
                res.status(200).json(video);
            }
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [DELETE] /videos/:id/delete
    async deleteVideo(req, res, next) {
        try {
            const deleteVideo = await VideoModel.findByIdAndDelete(req.body.id);
            res.status(200).json(req.body.id);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }
}

module.exports = new VideosController();
