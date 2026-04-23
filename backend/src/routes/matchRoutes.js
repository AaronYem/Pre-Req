const express = require('express');
const crypto = require('crypto');
const { authRequired } = require('../middleware/auth');
const { profileStore } = require('./profileRoutes');

const router = express.Router();
const swipeStore = new Map();
const matchStore = new Map();
const messageStore = new Map();

function swipeKey(a, b) {
  return `${a}:${b}`;
}

function matchUsers(userA, userB) {
  const sorted = [userA, userB].sort();
  return `${sorted[0]}:${sorted[1]}`;
}

router.post('/swipes/:targetUserId', authRequired, (req, res) => {
  const action = req.body.action;
  const targetUserId = req.params.targetUserId;

  if (!['like', 'pass'].includes(action)) {
    return res.status(400).json({ error: 'action must be like or pass' });
  }

  const me = profileStore.get(req.user.sub);
  const target = profileStore.get(targetUserId);
  if (!me || !target || me.university !== target.university) {
    return res.status(400).json({ error: 'Invalid target for same-school matching.' });
  }

  swipeStore.set(swipeKey(req.user.sub, targetUserId), action);

  if (action === 'like' && swipeStore.get(swipeKey(targetUserId, req.user.sub)) === 'like') {
    const key = matchUsers(req.user.sub, targetUserId);
    if (!matchStore.has(key)) {
      const match = {
        id: crypto.randomUUID(),
        user1Id: req.user.sub,
        user2Id: targetUserId,
        createdAt: new Date().toISOString(),
      };
      matchStore.set(key, match);
      messageStore.set(match.id, []);
    }
    return res.json({ ok: true, matched: true, match: matchStore.get(key) });
  }

  return res.json({ ok: true, matched: false });
});

router.get('/matches', authRequired, (req, res) => {
  const matches = [...matchStore.values()].filter(
    (m) => m.user1Id === req.user.sub || m.user2Id === req.user.sub
  );
  return res.json({ matches });
});

router.get('/matches/:id/messages', authRequired, (req, res) => {
  const messages = messageStore.get(req.params.id);
  if (!messages) return res.status(404).json({ error: 'Match not found' });
  return res.json({ messages });
});

router.post('/matches/:id/messages', authRequired, (req, res) => {
  const content = String(req.body.content || '').trim();
  if (!content) return res.status(400).json({ error: 'content is required' });

  const messages = messageStore.get(req.params.id);
  if (!messages) return res.status(404).json({ error: 'Match not found' });

  const message = {
    id: crypto.randomUUID(),
    matchId: req.params.id,
    senderId: req.user.sub,
    content,
    timestamp: new Date().toISOString(),
  };

  messages.push(message);
  return res.json({ ok: true, message });
});

module.exports = router;
