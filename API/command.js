const { exec } = require('child_process');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const command = req.body.command;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ output: stderr });
            }
            res.status(200).json({ output: stdout });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
