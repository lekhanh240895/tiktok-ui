const NotificationModel = require('../models/NotificationModel');
const CommentModel = require('../models/CommentModel');

class NotificationController {
    // [GET] api/notifications
    async getNotifications(req, res, next) {
        try {
            const notifications = await NotificationModel.find().populate([
                {
                    path: 'sender',
                    select: 'avatar username',
                },
                {
                    path: 'video',
                    select: 'cover',
                },
                {
                    path: 'comment',
                    select: 'text user',
                    populate: {
                        path: 'user',
                        select: 'username',
                    },
                },
            ]);

            res.status(200).json(notifications);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // Get notifications of a user
    // [GET]  api/notifications/:userID
    async getUserNotifications(req, res, next) {
        try {
            const notifications = await NotificationModel.find({
                receiver: req.params.userID,
            }).populate([
                {
                    path: 'sender',
                    select: 'avatar username',
                },
                {
                    path: 'video',
                    select: 'cover',
                },
                {
                    path: 'comment',
                    select: 'text user',
                    populate: {
                        path: 'user',
                        select: 'username',
                    },
                },
            ]);

            res.status(200).json(notifications);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [POST] api/notifications
    async createNotification(req, res, next) {
        try {
            const notification = await NotificationModel.findOne({
                $and: [
                    { type: req.body.type },
                    { sender: req.body.sender?._id },
                    { receiver: req.body.receiver },
                    { video: req.body.video?._id },
                    { subType: req.body.subType },
                ],
            }).populate('comment');

            const isComment = req.body.comment;

            if (!notification || isComment) {
                const newNotification = new NotificationModel({
                    ...req.body,
                    sender: req.user._id,
                });
                await newNotification.save();
                res.status(200).json(newNotification);
            } else {
                res.status(400).json('Error: Notification already exists!');
            }
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [PUT] api/notifications/:id/update
    async updateNotification(req, res, next) {
        try {
            const notification = await NotificationModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            res.status(200).json(notification);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [DELETE] api/notifications/:id
    async deleteNotification(req, res, next) {
        try {
            const deletedNotification =
                await NotificationModel.findByIdAndDelete(req.params.id);
            res.status(200).json(deletedNotification);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }
}

module.exports = new NotificationController();
