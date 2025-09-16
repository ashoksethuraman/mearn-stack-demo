const express = require("express");
const redis = require("redis");

const app = express();
const PORT = 3000;

// Redis subscriber
const sub = redis.createClient();
sub.subscribe("notifications");

let clients = []; // Connected SSE clients

// Middleware for SSE headers
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  console.log(`Client connected: ${clientId}, total: ${clients.length}`);

  // Remove client on disconnect
  req.on("close", () => {
    clients = clients.filter(c => c.id !== clientId);
    console.log(`Client disconnected: ${clientId}`);
  });
});

// Broadcast messages to all SSE clients
function sendEventsToAll(message) {
  clients.forEach(client => client.res.write(`data: ${JSON.stringify(message)}\n\n`));
}

// Listen to Redis messages
sub.on("message", (channel, message) => {
  console.log(`Received from Redis: ${message}`);
  sendEventsToAll({ message, channel });
});

// Test route to publish notifications
app.get("/notify/:msg", (req, res) => {
  const msg = req.params.msg;
  const pub = redis.createClient();
  pub.publish("notifications", msg);
  res.send(`Notification sent: ${msg}`);
});

app.listen(PORT, () => console.log(`SSE server running on port ${PORT}`));
