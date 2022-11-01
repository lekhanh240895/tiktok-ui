const ConversationModel = require('../models/ConversationModel');
const MessageModel = require('../models/MessageModel');

class ConversationController {
    // [GET] api/conversations
    async getConversations(req, res, next) {
        try {
            const conversations = await ConversationModel.find().populate(
                'members',
            );

            res.status(200).json(conversations);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // Get conversations of a user
    // [GET]  api/conversations/:userID
    async getUserConversations(req, res, next) {
        try {
            const conversation = await ConversationModel.find({
                members: {
                    $in: [req.params.userID],
                },
            }).populate('members');
            res.status(200).json(conversation);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // Get conversation with another user
    // [GET] api/conversations/:userID/:receiverID
    async getConversationWithAnotherUser(req, res, next) {
        try {
            const conversation = await ConversationModel.find({
                members: {
                    $all: [req.params.userID, req.params.receiverID],
                },
            }).populate('members');
            res.status(200).json(conversation);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [POST] api/conversations
    async createConversation(req, res, next) {
        try {
            const conversation = await ConversationModel.findOne({
                members: {
                    $all: [req.user.id, req.body.receiverID],
                },
            }).populate('members');

            if (conversation) {
                return res.status(200).json(conversation);
            }
            const newConversation = new ConversationModel({
                members: [req.user.id, req.body.receiverID],
            });
            await newConversation.save();
            res.status(200).json(newConversation);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [PUT] api/conversations/:id/update
    async updateConversation(req, res, next) {
        try {
            const conversation = await ConversationModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            res.status(200).json(conversation);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [DELETE] api/conversations/:id
    async deleteConversation(req, res, next) {
        try {
            const messages = await MessageModel.find({
                conversation: req.params.id,
            });
            let promises = [];
            promises.push(ConversationModel.findByIdAndDelete(req.params.id));
            messages.forEach((message) =>
                promises.push(MessageModel.findByIdAndDelete(message.id)),
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

module.exports = new ConversationController();
