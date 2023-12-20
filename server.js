const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// In-memory database for storing messages
let messages = [];

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(path.join(__dirname)));

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

// API endpoint for deleting all messages
app.delete('/api/messages', (req, res) => {
  messages = [];
  res.sendStatus(200);
});

// API endpoint for deleting messages by sender's name
app.delete('/api/messagesByName', (req, res) => {
  const senderNameToDelete = req.query.sender;

  messages = messages.filter(message => message.sender !== senderNameToDelete);

  res.sendStatus(200);
});

// Serve your HTML file as the default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});
