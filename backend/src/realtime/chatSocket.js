const { WebSocketServer } = require('ws');

function setupChatSocket(server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (socket) => {
    socket.on('message', (rawData) => {
      // Broadcast MVP chat events to all connected clients.
      for (const client of wss.clients) {
        if (client.readyState === 1) {
          client.send(rawData.toString());
        }
      }
    });
  });

  return wss;
}

module.exports = { setupChatSocket };
