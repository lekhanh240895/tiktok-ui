const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');
const { protect } = require('../middlewares/authMiddleware');

router.delete('/:id', protect, MessageController.deleteMessage);
router.put('/:id/update', protect, MessageController.updateMessage);
router.put('/:id/like', protect, MessageController.likeMessage);
router.post('/', protect, MessageController.createMessage);
router.get('/:conversationID', MessageController.getMessage);
router.get('/', MessageController.getMessages);

module.exports = router;
