const express = require('express');
const { authRequired } = require('../middleware/auth');
const { isAdult, isValidPhotoArray } = require('../utils/validators');

const router = express.Router();
const profileStore = new Map();

router.post('/', authRequired, (req, res) => {
  const {
    name,
    age,
    bio,
    instagram,
    photos,
    prompts = [],
    interests = [],
    major,
    year,
    clubs = [],
    favoriteCoffeeShop,
    favoriteBar,
    favoriteFastFood,
  } = req.body;

  if (!name || !isAdult(age) || !isValidPhotoArray(photos)) {
    return res.status(400).json({
      error: 'Profile requires name, age 18+, and 3-6 photos.',
    });
  }

  const profile = {
    userId: req.user.sub,
    university: req.user.university,
    name,
    age,
    bio: bio || '',
    instagram: instagram || null,
    photos,
    prompts,
    interests,
    major: major || null,
    year: year || null,
    clubs,
    favoriteCoffeeShop: favoriteCoffeeShop || null,
    favoriteBar: favoriteBar || null,
    favoriteFastFood: favoriteFastFood || null,
  };

  profileStore.set(req.user.sub, profile);
  return res.json({ ok: true, profile });
});

router.get('/me', authRequired, (req, res) => {
  const profile = profileStore.get(req.user.sub);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  return res.json(profile);
});

router.get('/discover', authRequired, (req, res) => {
  const candidates = [...profileStore.values()].filter(
    (profile) => profile.userId !== req.user.sub && profile.university === req.user.university
  );
  return res.json({ users: candidates });
});

module.exports = { profileRouter: router, profileStore };
