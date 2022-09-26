const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const { protect } = require("../middlewares/authMiddleware");

router.put("/follow", protect, UsersController.followUser);
router.put("/unfollow", protect, UsersController.unfollowUser);
router.put("/:id/update", protect, UsersController.updateUser);
router.delete("/:id/delete", UsersController.deleteUser);
router.get("/me", protect, UsersController.getMe);
router.get("/", UsersController.getUsers);

module.exports = router;
