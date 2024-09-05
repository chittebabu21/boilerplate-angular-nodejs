const pool = require('../dao/db');

class ChatService {
    constructor() {}

    insert(data, callback) {
        pool.query('INSERT INTO messages SET ?', [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    }
}

module.exports = ChatService;