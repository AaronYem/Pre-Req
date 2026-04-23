const express = require('express');
const { requestOtp, verifyOtp } = require('../services/authService');

const router = express.Router();

router.post('/request-otp', (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const result = requestOtp(email);
  if (!result.ok) return res.status(400).json({ error: result.error });

  // Demo behavior for MVP: returning OTP directly.
  return res.json({ ok: true, otp: result.code });
});

router.post('/verify-otp', (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const otp = String(req.body.otp || '').trim();
  const result = verifyOtp(email, otp);

  if (!result.ok) return res.status(400).json({ error: result.error });
  return res.json(result);
});

module.exports = router;
