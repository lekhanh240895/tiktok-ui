const MessageModel = require('../models/MessageModel');
const ConversationModel = require('../models/ConversationModel');

class MessageController {
    // [GET] api/messages
    async getMessages(req, res, next) {
        try {
            const messages = await MessageModel.find()
                .populate('sender')
                .populate('likes')
                .exec();

            res.status(200).json(messages);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // Get messages of a conversation
    // [GET]  api/messages/:conversationID
    async getMessage(req, res, next) {
        try {
            const message = await MessageModel.find({
                conversation: req.params.conversationID,
            })
                .populate('sender')
                .populate('likes')
                .exec();
            res.status(200).json(message);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [POST] api/messages
    async createMessage(req, res, next) {
        try {
            const newMessage = new MessageModel({
                ...req.body,
                sender: req.user._id,
            });
            await newMessage.save();
            res.status(200).json(newMessage);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [PUT] api/messages/:id/update
    async updateMessage(req, res, next) {
        try {
            const message = await MessageModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            res.status(200).json(message);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [PUT] api/messages/:id/like
    async likeMessage(req, res, next) {
        try {
            const message = await MessageModel.findById(req.params.id);
            if (!message.likes.includes(req.user.id)) {
                await message.updateOne({
                    $push: { likes: req.user.id },
                });
                res.status(200).json('Message liked!');
            } else {
                await message.updateOne({
                    $pull: { likes: req.user.id },
                });
                res.status(200).json('Message unliked!');
            }
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }

    // [DELETE] api/messages/:id
    async deleteMessage(req, res, next) {
        try {
            const deletedMessage = await MessageModel.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json(deletedMessage);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }
}

module.exports = new MessageController();
