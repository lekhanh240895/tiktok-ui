const CommentModel = require('../models/CommentModel');
const VideoModel = require('../models/VideoModel');

class CommentController {
    // [GET] api/comments/:videoID
    async getComments(req, res, next) {
        try {
            const comments = await CommentModel.find({
                video: req.params.videoID,
            })
                .populate('video')
                .populate('user')
                .exec();
            res.status(200).json(comments);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [GET]  api/comments/:videoID/:commentID
    async getComment(req, res, next) {
        try {
            const comments = await CommentModel.findById(req.params.id);
            res.status(200).json(comments);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [POST] api/comments/:videoID
    async createComment(req, res, next) {
        try {
            const newComment = new CommentModel({
                text: req.body.text,
                user: req.user._id,
                video: req.params.videoID,
            });
            await newComment.save();

            const newVideo = await VideoModel.findByIdAndUpdate(
                req.params.videoID,
                {
                    $push: { comments: newComment._id },
                },
                {
                    new: true,
                },
            );
            res.status(200).json(newComment);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [PUT] api/comments/:videoID/:commentID/update
    async updateComment(req, res, next) {
        try {
            const comment = await CommentModel.findByIdAndUpdate(
                req.params.commentID,
                req.body,
                { new: true },
            );
            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [PUT] api/comments/:videoID/:commentID/like
    async likeComment(req, res, next) {
        try {
            const comment = await CommentModel.findById(req.params.commentID);
            if (!comment.likes.includes(req.user.id)) {
                await comment.updateOne({
                    $push: { likes: req.user.id },
                });
                res.status(200).json(comment);
            } else {
                await comment.updateOne({
                    $pull: { likes: req.user.id },
                });
                res.status(200).json(comment);
            }
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [DELETE] api/comments/:videoID/:commentID/delete
    async deleteComment(req, res, next) {
        try {
            const deletedComment = await CommentModel.findByIdAndDelete(
                req.body.id,
            );
            res.status(200).json(deletedComment);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }
}

module.exports = new CommentController();