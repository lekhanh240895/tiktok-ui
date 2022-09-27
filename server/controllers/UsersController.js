const UserModel = require("../models/UserModel");

class UsersController {
  // [GET] /users
  async getUsers(req, res, next) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [GET] /users/me
  async getMe(req, res, next) {
    try {
      res.status(200).json(req.user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [PUT] /users/:id/update
  async updateUser(req, res) {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [DELETE] /users/delete
  async deleteUser(req, res) {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [PUT] /users/follow
  async follow(req, res) {
    try {
      // Update followed user
      const followedUser = await UserModel.findByIdAndUpdate(
        req.body._id,
        {
          $push: { followerIDs: req.user._id },
        },
        {
          new: true,
        }
      );

      // Update current user
      const currentUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          $push: { followingIDs: req.body._id },
        },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ followedUserID: req.body._id, currentUserID: req.user._id });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [PUT] /users/unfollow
  async unfollow(req, res) {
    try {
      // Update followed user
      const unfollowedUser = await UserModel.findByIdAndUpdate(
        req.body._id,
        {
          $pull: { followerIDs: req.user._id },
        },
        {
          new: true,
        }
      );

      // Update current user
      const currentUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { followingIDs: req.body._id },
        },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ unfollowedUserID: req.body._id, currentUserID: req.user._id });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

module.exports = new UsersController();
