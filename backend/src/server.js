require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const { profileRouter } = require('./routes/profileRoutes');
const matchRoutes = require('./routes/matchRoutes');
const { setupChatSocket } = require('./realtime/chatSocket');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'campusmatch-backend' });
});

app.use('/auth', authRoutes);
app.use('/profiles', profileRouter);
app.use('/', matchRoutes);

const port = Number(process.env.PORT || 4000);
const server = http.createServer(app);
setupChatSocket(server);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
});
