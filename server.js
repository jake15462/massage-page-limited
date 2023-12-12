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

app.delete('/api/messages', (req, res) => {
  messages = []; // Clear the messages array
  res.json({ message: 'All chats deleted successfully' });
});

app.delete('/api/messagesByName', (req, res) => {
  const senderNameToDelete = req.query.sender;

  // Delete messages by sender's name
  messages = messages.filter(message => message.sender !== senderNameToDelete);

  res.sendStatus(200);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});
