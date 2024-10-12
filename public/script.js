const socket = io();

document.getElementById('input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const inputField = document.getElementById('input');
        const command = inputField.value;
        
        // Emit the command to the server
        socket.emit('command', command);
        inputField.value = ''; // Clear the input

        // Optionally, display the command in the output area
        const outputArea = document.getElementById('output');
        outputArea.innerHTML += `<div>$ ${command}</div>`;
    }
});

// Listen for output from the server
socket.on('output', (data) => {
    const outputArea = document.getElementById('output');
    outputArea.innerHTML += `<div>${data}</div>`;
});
