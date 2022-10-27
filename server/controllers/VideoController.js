const VideoModel = require('../models/VideoModel');
const NotificationModel = require('../models/NotificationModel');
const CommentModel = require('../models/CommentModel');

class VideosController {
    // [GET] api/videos
    async getVideos(req, res, next) {
        try {
            const videos = await VideoModel.find().populate([
                {
                    path: 'user',
                    select: 'username full_name avatar tick',
                },
                {
                    path: 'comments',
                    select: 'user text video',
                    populate: [
                        {
                            path: 'user',
                            select: 'username tick avatar',
                        },
                    ],
                },
            ]);
            res.status(200).json(videos);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [GET] api/videos/:id
    async getVideo(req, res, next) {
        try {
            const video = await VideoModel.findById(req.params.id).populate([
                {
                    path: 'user',
                    select: 'username full_name avatar tick',
                },
                {
                    path: 'comments',
                    select: 'user text video',
                    populate: [
                        {
                            path: 'user',
                            select: 'username tick avatar',
                        },
                    ],
                },
            ]);
            res.status(200).json(video);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [POST] api/videos
    async createVideo(req, res, next) {
        try {
            const tags = req.body.title
                .split(' ')
                .filter((t) => t.includes('#'))
                .map((t) => t.replace('#', ''));
            const video = new VideoModel({
                ...req.body,
                tags,
                user: req.user._id,
            });

            await video.save();
            res.status(200).json(video);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
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
            next(err);
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
            next(err);
        }
    }

    // [DELETE] api/videos/:id
    async deleteVideo(req, res, next) {
        try {
            const videoNotifications = await NotificationModel.find({
                video: req.params.id,
            });
            const videoComments = await CommentModel.find({
                video: req.params.id,
            });
            let promises = [];
            promises.push(VideoModel.findByIdAndDelete(req.params.id));
            videoNotifications.forEach((notif) =>
                promises.push(NotificationModel.findByIdAndDelete(notif._id)),
            );
            videoComments.forEach((comment) =>
                promises.push(CommentModel.findByIdAndDelete(comment._id)),
            );
            Promise.all(promises)
                .then(() => {
                    res.status(200).json(req.params.id);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }
}

module.exports = new VideosController();
