const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

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

  // [GET] /users/:id
  async getUser(req, res, next) {
    try {
      const user = await UserModel.findById(req.params.id);
      res.status(200).json(user);
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
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          res.status(500).json({ error: err });
        }
      }

      try {
        const user = await UserModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ error: err });
      }
    } else {
      res.status(400);
      throw new Error("Error: You can only update your account!");
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
      }
    } else {
      res.status(400);
      throw new Error("Error: You can only delete your account!");
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
