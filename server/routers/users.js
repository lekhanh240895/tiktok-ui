const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.post("/update", UsersController.updateUser);
router.post("/", UsersController.createUser);
router.get("/", UsersController.getUsers);

module.exports = router;
