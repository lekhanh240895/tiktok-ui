const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const { protect } = require('../middlewares/authMiddleware');

router.delete('/:id', protect, NotificationController.deleteNotification);
router.put('/', protect, NotificationController.updateNotification);
router.post('/', protect, NotificationController.createNotification);
router.get('/:userID', NotificationController.getUserNotifications);
router.get('/', NotificationController.getNotifications);

module.exports = router;
