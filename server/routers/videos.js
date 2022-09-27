const express = require("express");
const router = express.Router();
const VideosController = require("../controllers/VideoController");
const { protect } = require("../middlewares/authMiddleware");

router.put("/:id/update", protect, VideosController.updateVideo);
router.delete("/:id/delete", protect, VideosController.deleteVideo);
router.get("/:id", VideosController.getVideo);
router.post("/", protect, VideosController.createVideo);
router.get("/", VideosController.getVideos);

module.exports = router;
