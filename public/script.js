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
            
            // Log the response for debugging
            console.log('Response:', response);

            const data = await response.json(); // Parse the JSON response
            
            // Log the data for debugging
            console.log('Data:', data);
            
            output.innerHTML += `${data.output}<br>`; // Display output
        } catch (error) {
            output.innerHTML += `Error: ${error.message}<br>`;
        }

        output.scrollTop = output.scrollHeight; // Scroll to bottom
    }
});
