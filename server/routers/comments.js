const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { protect } = require('../middlewares/authMiddleware');

router.delete(
    '/:videoID/:commentID/delete',
    protect,
    CommentController.deleteComment,
);
router.put(
    '/:videoID/:commentID/update',
    protect,
    CommentController.updateComment,
);
router.put('/:videoID/:commentID/like', protect, CommentController.likeComment);
router.get('/:videoID/:commentID', CommentController.getComment);
router.post('/:videoID', protect, CommentController.createComment);
router.get('/:videoID', CommentController.getComments);

module.exports = router;
