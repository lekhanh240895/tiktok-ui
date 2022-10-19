const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/ConversationController');
const { protect } = require('../middlewares/authMiddleware');

router.delete('/:id', protect, ConversationController.deleteConversation);
router.put('/', protect, ConversationController.updateConversation);
router.post('/', protect, ConversationController.createConversation);
router.get('/:userID', ConversationController.getUserConversations);
router.get('/', ConversationController.getConversations);

module.exports = router;
