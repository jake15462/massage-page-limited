const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory database for storing messages
let messages = [];

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API endpoint for fetching messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// API endpoint for sending messages
app.post('/api/messages', (req, res) => {
  const { sender, text } = req.body;
  const newMessage = { sender, text, timestamp: new Date() };
  messages.push(newMessage);
  res.json(newMessage);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
