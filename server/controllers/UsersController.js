const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

class UsersController {
    // [GET] /users
    async getUsers(req, res, next) {
        try {
            const users = await UserModel.find().select('-password');
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [GET] /users/:id
    async getUser(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.id).select(
                '-password',
            );
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [GET] /users/search?q=:query
    async getUsersByQuery(req, res, next) {
        try {
            const regEx = new RegExp(`${req.query.q}`, 'i');
            const users = await UserModel.find({
                $or: [{ username: regEx }, { full_name: regEx }],
                $and: [
                    {
                        _id: { $ne: req.user._id },
                    },
                ],
            }).select('-password');

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [GET] /users/me
    async getMe(req, res, next) {
        try {
            res.status(200).json(req.user);
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [PUT] /users/:id
    async updateUser(req, res, next) {
        try {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                if (req.body.password) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(
                            req.body.password,
                            salt,
                        );
                    } catch (err) {
                        res.status(500).json({ error: err });
                        next(err);
                    }
                }

                try {
                    const isUser = req.user.username === req.body.username;
                    const userExixts = await UserModel.findOne({
                        username: req.body.username,
                    });

                    if (!isUser && userExixts) {
                        res.status(400).json({
                            status: 400,
                            message: 'Username already exists!',
                        });
                        throw new Error('Username already exixts!');
                    }

                    if (isUser || !userExixts) {
                        const user = await UserModel.findByIdAndUpdate(
                            req.params.id,
                            req.body,
                            {
                                new: true,
                            },
                        );
                        res.status(200).json(user);
                    }
                } catch (err) {
                    next(err);
                }
            } else {
                res.status(400);
                throw new Error('Error: You can only update your account!');
            }
        } catch (err) {
            next(err);
        }
    }

    // [DELETE] /users/:id/delete
    async deleteUser(req, res) {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            try {
                const user = await UserModel.findByIdAndDelete(req.params.id);
                res.status(200).json(user);
            } catch (err) {
                res.status(500).json({ error: err });
                next(err);
            }
        } else {
            res.status(400);
            throw new Error('Error: You can only delete your account!');
        }
    }

    // [PUT] /users/follow
    async follow(req, res) {
        try {
            // Update followed user
            const followedUser = await UserModel.findByIdAndUpdate(
                req.body._id,
                {
                    $push: { followers: req.user._id },
                },
                {
                    new: true,
                },
            );

            // Update current user
            const currentUser = await UserModel.findByIdAndUpdate(
                req.user._id,
                {
                    $push: { followings: req.body._id },
                },
                {
                    new: true,
                },
            );
            res.status(200).json({
                followedUserID: req.body._id,
                currentUserID: req.user._id,
            });
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }

    // [PUT] /users/unfollow
    async unfollow(req, res) {
        try {
            // Update followed user
            const unfollowedUser = await UserModel.findByIdAndUpdate(
                req.body._id,
                {
                    $pull: { followers: req.user._id },
                },
                {
                    new: true,
                },
            );

            // Update current user
            const currentUser = await UserModel.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: { followings: req.body._id },
                },
                {
                    new: true,
                },
            );
            res.status(200).json({
                unfollowedUserID: req.body._id,
                currentUserID: req.user._id,
            });
        } catch (err) {
            res.status(500).json({ error: err });
            next(err);
        }
    }
}

module.exports = new UsersController();
