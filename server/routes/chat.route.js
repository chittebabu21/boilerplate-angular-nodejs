const router = require('express').Router();
const ChatController = require('../controllers/chat.controller');
const chatController = new ChatController();

router.post('/', chatController.insert);

module.exports = router;