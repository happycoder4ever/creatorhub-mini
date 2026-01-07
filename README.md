# CreatorHub Mini

A prototype Web3 content platform with Sign-In-With-Ethereum authentication and premium content gating.

## Features

- Sign in with Ethereum (SIWE)
- Session authentication with NextAuth
- Public and Premium posts
- Premium content lock/unlock based on access check (currently mocked)

## Tech Stack

- Next.js (App Router)
- NextAuth
- Ethers.js
- Prisma

## Setup

npm install

cp .env.example .env

npx prisma generate  
npx prisma migrate dev

npm run dev

Then open:

http://localhost:3000

## How It Works

1. User connects wallet and signs SIWE message
2. NextAuth verifies signature and creates session
3. Frontend fetches all posts from /api/posts
4. For premium posts, frontend calls /api/access
5. If access is granted, content is shown; otherwise it is locked

## API Endpoints

- GET /api/posts → returns all posts
- POST /api/access → checks premium access (mocked)
- /api/auth/\* → NextAuth + SIWE

## Current Limitations

- NFT / subscription check is mocked
- No caching
- No tests
- Basic UI only

## TODO

- Replace mocked access check with real contract call
- Add caching
- Add tests
- Improve UI
