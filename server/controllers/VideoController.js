const VideoModel = require('../models/VideoModel');

class VideosController {
    // [GET] api/videos
    async getVideos(req, res, next) {
        try {
            const videos = await VideoModel.find()
                .populate('user')
                .populate('comments')
                .exec();
            res.status(200).json(videos);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [GET] api/videos/:id
    async getVideo(req, res, next) {
        try {
            const video = await VideoModel.findById(req.params.id)
                .populate('user')
                .populate('comments')
                .exec();
            res.status(200).json(video);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [POST] api/videos
    async createVideo(req, res, next) {
        try {
            const video = new VideoModel({
                ...req.body,
                user: req.user._id,
            });

            await video.save();
            res.status(200).json(video);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [PUT] api/videos/:id/update
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

    // [PUT] api/videos/:id/like
    async likeVideo(req, res, next) {
        try {
            const video = await VideoModel.findById(req.params.id);

            if (video.likes.includes(req.user._id)) {
                const newVideo = await VideoModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        $pull: { likes: req.user._id },
                    },
                    { new: true },
                );
                res.status(200).json(newVideo);
            } else {
                const newVideo = await VideoModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        $push: { likes: req.user._id },
                    },
                    { new: true },
                );
                res.status(200).json(newVideo);
            }
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [DELETE] api/videos/:id/delete
    async deleteVideo(req, res, next) {
        try {
            const deletedVideo = await VideoModel.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json(deletedVideo);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }
}

module.exports = new VideosController();
