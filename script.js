const output = document.getElementById('output');
const input = document.getElementById('input');

input.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
        const command = input.value;
        input.value = '';

        // Display command in the output area
        output.innerHTML += `<span>$ ${command}</span><br>`;
        
        try {
            const response = await fetch('/api/command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command })
            });
            const data = await response.json();
            output.innerHTML += `${data.output}<br>`;
        } catch (error) {
            output.innerHTML += `Error: ${error.message}<br>`;
        }

        output.scrollTop = output.scrollHeight; // Scroll to bottom
    }
});
