const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('command', (command) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                socket.emit('output', `Error: ${stderr}`);
                return;
            }
            socket.emit('output', stdout);
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
