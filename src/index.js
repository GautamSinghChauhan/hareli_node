const express = require('express');
const http = require('http'); // Required to integrate WebSocket with Express
const WebSocket = require('ws'); // WebSocket library
const cors = require('cors');
const routes = require('../src/routes/route');
const connectDB = require('../src/db/index');
const cookieParser = require('cookie-parser');
const ChatUser = require("../src/models/ChatUsers"); // Import ChatUser model


require('dotenv').config();

const app = express();
const server = http.createServer(app); // HTTP server
const wss = new WebSocket.Server({ server }); // Attach WebSocket server to HTTP server

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// WebSocket server setup
let clients = new Set();

wss.on('connection', (ws) => {
  // console.log('New client connected');
  clients.add(ws);

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    for (let client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// MongoDB connection
connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    server.listen(port, () => {
      console.log(`⚙️ Server is running at http://localhost:${port}`);
      console.log(`🌐 WebSocket server is running at ws://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Routes
app.use('/', routes);
