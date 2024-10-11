const output = document.getElementById('output');
const input = document.getElementById('input');

input.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
        const command = input.value;
        input.value = '';

        // Send command to the server
        output.innerHTML += `$ ${command}<br>`;
        const response = await fetch('/api/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        });
        const data = await response.json();
        output.innerHTML += `${data.output}<br>`;
        output.scrollTop = output.scrollHeight; // Scroll to bottom
    }
});
