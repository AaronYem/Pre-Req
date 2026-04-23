# CampusMatch MVP (Production-Oriented Scaffold)

This repository now contains a **clear full-stack MVP scaffold** aligned to your requested direction:

- Mobile-first client with **React Native + Expo**
- Backend API with **Node.js + Express**
- **PostgreSQL schema** included
- `.edu` email verification + recognized university-domain mapping
- Same-university-only discovery and matching
- Real-time chat channel scaffold (WebSocket)

## Project Structure

```text
backend/
  src/
    config/universities.js
    db/pool.js
    db/schema.sql
    middleware/auth.js
    realtime/chatSocket.js
    routes/authRoutes.js
    routes/profileRoutes.js
    routes/matchRoutes.js
    services/authService.js
    utils/validators.js
    server.js
  test/
    university.test.js
  package.json
  .env.example

frontend/
  src/components/PrimaryButton.js
  src/screens/OnboardingScreen.js
  src/screens/ProfileScreen.js
  src/screens/SwipeScreen.js
  src/screens/MatchesScreen.js
  src/screens/ChatScreen.js
  App.js
  app.json
  package.json
```

## Backend Features Implemented

- `.edu` + recognized domain validation.
- OTP request and verification endpoints.
- JWT auth middleware.
- Profile creation with required validation (name, age 18+, 3–6 photos).
- Discover endpoint restricted to same university.
- Swipe right/left semantics (`like` / `pass`).
- Mutual likes create matches.
- Messaging endpoints per match.
- WebSocket endpoint (`/ws`) for real-time chat events.

## SQL Schema

The complete schema is in `backend/src/db/schema.sql` and includes:

- `users`
- `profiles`
- `swipes`
- `matches`
- `messages`

## API Surface (MVP)

- `POST /auth/request-otp`
- `POST /auth/verify-otp`
- `POST /profiles`
- `GET /profiles/me`
- `GET /profiles/discover`
- `POST /swipes/:targetUserId`
- `GET /matches`
- `GET /matches/:id/messages`
- `POST /matches/:id/messages`

## Next Step to Run Locally

1. Copy `backend/.env.example` to `backend/.env`.
2. Start Postgres and apply `backend/src/db/schema.sql`.
3. Install backend deps, then run the API.
4. Install frontend deps, then run Expo app.

> Note: Current route logic uses in-memory stores for rapid MVP iteration while providing the production-oriented folder structure and schema you requested.
