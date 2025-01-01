const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const colors = ['31', '32', '33', '34'];

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');

  const filePath = path.join(__dirname, 'frames', 'aa.txt');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
      return;
    }
    
    let index = 0;

    const sendAA = () => {
      res.write('\x1b[2J');
      res.write('\x1b[H');

      const colorCode = colors[index % colors.length];
      const coloredText = `\u001b[1;${colorCode}m${data}\u001b[0m`;

      res.write(`${coloredText}\n`);
      index++;

      setTimeout(sendAA, 500);
    }

    sendAA();
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});