const express = require('express');
const request = require('request');

const app = express();
const port = 3001; // Choose a port for your proxy server

// Middleware to modify the request before forwarding
app.use((req, res, next) => {
  // Set custom headers here
  req.headers['ngrok-skip-browser-warning'] = 'true';
  // Alternatively, you can set a custom User-Agent header
  // req.headers['User-Agent'] = 'Your-Custom-User-Agent';

  // Forward the modified request to ngrok
  req.pipe(request(`http://localhost:4040${req.url}`)).pipe(res);
});

// Start the proxy server
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
