const express = require('express');
const router = express.Router();
const VideosController = require('../controllers/VideoController');
const { protect } = require('../middlewares/authMiddleware');

router.delete('/:id', protect, VideosController.deleteVideo);
router.put('/:id/update', protect, VideosController.updateVideo);
router.put('/:id/like', protect, VideosController.likeVideo);
router.get('/:id', VideosController.getVideo);
router.post('/', protect, VideosController.createVideo);
router.get('/', VideosController.getVideos);

module.exports = router;
