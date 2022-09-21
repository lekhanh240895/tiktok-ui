const express = require("express");
const router = express.Router();
const VideosController = require("../controllers/videos");

router.post("/update", VideosController.updateVideo);
router.post("/", VideosController.createVideo);
router.get("/", VideosController.getVideos);

module.exports = router;
