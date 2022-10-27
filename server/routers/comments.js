const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/:videoID', protect, CommentController.createComment);
router.delete('/:commentID/delete', protect, CommentController.deleteComment);
router.put('/:commentID/update', protect, CommentController.updateComment);
router.put('/:commentID/like', protect, CommentController.likeComment);
router.get('/:videoID', CommentController.getVideoComments);

module.exports = router;
