const ChatService = require('../services/chat.service');
const chatService = new ChatService();

class ChatController {
    constructor() {}

    insert(req, res) {
        const body = req.body;

        if (!body.msg) {
            return res.status(500).json({
                success: 0, 
                message: 'Invalid data...'
            });
        }

        chatService.insert(body, (error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0, 
                    message: error.message
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                    message: body.msg
                });
            }
        });
    }
}

module.exports = ChatController;