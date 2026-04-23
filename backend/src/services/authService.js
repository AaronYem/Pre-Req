const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { getUniversityFromEmail, isAllowedEduEmail } = require('../config/universities');

const otpStore = new Map();

function requestOtp(email) {
  if (!isAllowedEduEmail(email)) {
    return { ok: false, error: 'Email must be a recognized .edu address.' };
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  otpStore.set(email, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  return { ok: true, code };
}

function verifyOtp(email, otp) {
  const entry = otpStore.get(email);
  if (!entry || entry.code !== otp || Date.now() > entry.expiresAt) {
    return { ok: false, error: 'Invalid or expired OTP.' };
  }

  const universityData = getUniversityFromEmail(email);
  if (!universityData) {
    return { ok: false, error: 'University domain is not allowed.' };
  }

  otpStore.delete(email);
  const userId = crypto.randomUUID();
  const token = jwt.sign(
    { sub: userId, email, university: universityData.university },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    ok: true,
    token,
    user: {
      id: userId,
      email,
      university: universityData.university,
      verified: true,
    },
  };
}

module.exports = { requestOtp, verifyOtp };
