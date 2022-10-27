const CommentModel = require('../models/CommentModel');
const VideoModel = require('../models/VideoModel');

class CommentController {
    // [GET] api/comments/:videoID
    async getVideoComments(req, res, next) {
        try {
            const comments = await CommentModel.find({
                video: req.params.videoID,
            }).populate([
                {
                    path: 'video',
                },
                {
                    path: 'user',
                    select: 'username full_name avatar tick ',
                },
            ]);
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

            await VideoModel.findByIdAndUpdate(
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

    // [PUT] api/comments/:commentID/update
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

    // [PUT] api/comments/:commentID/like
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

    // [DELETE] api/comments/:commentID/delete
    async deleteComment(req, res, next) {
        try {
            const deletedComment = await CommentModel.findByIdAndDelete(
                req.params.commentID,
            );
            res.status(200).json(deletedComment);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }
}

module.exports = new CommentController();
