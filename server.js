// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { exec } = require('child_process');
const path = require('path');

// Create an Express application
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (e.g., index.html, styles.css, etc.)
app.use(express.static(path.join(__dirname)));

// Define the /api/command endpoint
app.post('/api/command', (req, res) => {
    const command = req.body.command; // Extract the command from the request body

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({ output: `Error: ${stderr}` }); // Send back the error if the command fails
        }
        res.json({ output: stdout }); // Send back the command output as JSON
    });
});

// Handle socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the environment port or default to 3000
server.listen(PORT, () => {
    console.log(`server.js was just ran returning the port of ${PORT}`);
});
