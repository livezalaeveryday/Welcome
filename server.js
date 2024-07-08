const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const filePath = 'data.txt';

app.use(express.json());
app.use(express.static('public'));

app.post('/data.txt', (req, res) => {
    const member = req.body;
    const data = `${member.fname},${member.lname},${member.phone},${member.email}\n`;
    fs.appendFile(filePath, data, (err) => {
        if (err) throw err;
        res.status(200).send('Member saved');
    });
});

app.delete('/data.txt', (req, res) => {
    const member = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const members = data.split('\n').filter(line => line.trim() !== '').map(line => {
            const [fname, lname, phone, email] = line.split(',');
            return { fname, lname, phone, email };
        });
        const newMembers = members.filter(m => m.fname !== member.fname || m.lname !== member.lname || m.phone !== member.phone || m.email !== member.email);
        const newData = newMembers.map(m => `${m.fname},${m.lname},${m.phone},${m.email}`).join('\n') + '\n';
        fs.writeFile(filePath, newData, (err) => {
            if (err) throw err;
            res.status(200).send('Member deleted');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});