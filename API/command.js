const { exec } = require('child_process');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const command = req.body.command;

        // Limit commands for security
        const allowedCommands = ['echo', 'ls', 'pwd']; // Add more allowed commands as needed

        const commandName = command.split(' ')[0];
        if (!allowedCommands.includes(commandName)) {
            return res.status(400).json({ output: 'Command not allowed' });
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ output: stderr });
            }
            res.status(200).json({ output: stdout || stderr });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
