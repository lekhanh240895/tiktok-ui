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
            next();
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
            next();
        }
    }

    // [POST] api/notifications
    async createNotification(req, res, next) {
        try {
            const isOwn = req.user.id === req.body.receiver;
            if (isOwn) {
                res.status(500).json({
                    error: 'A user notification is not created!',
                });
            } else {
                const newNotification = new NotificationModel({
                    ...req.body,
                    sender: req.user._id,
                });
                await newNotification.save();
                res.status(200).json(newNotification);
            }
        } catch (err) {
            res.status(500).json({ error: err });
            next();
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
            next();
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
            next();
        }
    }
}

module.exports = new NotificationController();
