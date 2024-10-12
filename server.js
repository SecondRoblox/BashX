const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from the public directory

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('command', (cmd) => {
        // Here you would normally process the command and return the output
        let output;
        try {
            // For demo purposes, we just echo the command
            output = `You entered: ${cmd}`;
        } catch (error) {
            output = `Error: ${error.message}`;
        }
        
        socket.emit('output', output);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
