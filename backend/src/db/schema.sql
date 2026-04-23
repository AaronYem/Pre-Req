CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  university TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  name TEXT,
  age INT,
  bio TEXT,
  instagram TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  photos TEXT[] NOT NULL,
  prompts JSONB NOT NULL DEFAULT '[]'::jsonb,
  interests TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  major TEXT,
  year TEXT,
  clubs TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  favorite_coffee_shop TEXT,
  favorite_bar TEXT,
  favorite_fast_food TEXT
);

CREATE TABLE IF NOT EXISTS swipes (
  id UUID PRIMARY KEY,
  swiper_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  swiped_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('like', 'pass')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(swiper_id, swiped_id)
);

CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY,
  user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY,
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
