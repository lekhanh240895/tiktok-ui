const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const { protect } = require('../middlewares/authMiddleware');

router.put('/follow', protect, UsersController.follow);
router.put('/unfollow', protect, UsersController.unfollow);
router.put('/:id', protect, UsersController.updateUser);
router.delete('/:id/delete', protect, UsersController.deleteUser);
router.get('/me', protect, UsersController.getMe);
router.get('/search', protect, UsersController.getUsersByQuery);
router.get('/:id', UsersController.getUser);
router.get('/', UsersController.getUsers);

module.exports = router;
