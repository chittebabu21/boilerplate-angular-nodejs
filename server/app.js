// import dependencies 
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const ChatController = require('./controllers/chat.controller');

const chatController = new ChatController();

const chatRouter = require('./routes/chat.route');

// configuration
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 4000;

// create http server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// connect with socket io
io.on('connection', (socket) => {
    console.log('New connection established!');

    socket.on('message', async (data) => {
        try {
            const req = { body: data };
            const res = {
                status: (code) => ({
                    json: (response) => {
                        if (code === 200) {
                            socket.emit('Success', response);
                            io.emit('message', data);
                            console.log(data);
                        } else {
                            socket.emit('Error', response);
                        }
                    }
                })
            };

            await chatController.insert(req, res);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected...');
    });
});

app.use('/chat', chatRouter); // router

// listen on port ~ npx nodemon app
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});