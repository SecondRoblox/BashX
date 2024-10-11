const socket = io();
const output = document.getElementById('output');
const input = document.getElementById('input');

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const command = input.value;
        input.value = '';

        // Send command to the server
        socket.emit('command', command);
        output.innerHTML += `$ ${command}<br>`;
    }
});

socket.on('output', function (data) {
    output.innerHTML += `${data}<br>`;
    output.scrollTop = output.scrollHeight; // Scroll to bottom
});
