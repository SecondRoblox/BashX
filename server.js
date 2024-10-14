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
app.use(express.json()); // To parse JSON request bodies

// Define the command endpoint
app.post('/api/command', (req, res) => {
    const command = req.body.command;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({ output: `Error: ${stderr}` });
        }
        res.json({ output: stdout });
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
