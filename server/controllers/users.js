const UserSchema = require("../models/UserSchema");

class UsersController {
  // [GET] /users
  async getUsers(req, res, next) {
    try {
      const users = await UserSchema.find();
      console.log("users", users);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [POST] /users
  async createUser(req, res) {
    try {
      const newUser = req.body;
      const user = new UserSchema(newUser);
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // [PUT] /users/update
  async updateUser(req, res) {
    try {
      const updateUser = req.body;
      await UserSchema.updateOne({ _id: updateUser._id }, updateUser);
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

module.exports = new UsersController();
