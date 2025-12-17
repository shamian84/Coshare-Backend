## 📁 CoShare Backend

Backend service for **CoShare**, a secure file-sharing application with JWT authentication and 12-hour expiring share links.

## Features

- JWT Authentication (Register / Login)
- Secure file upload & download
- User-specific file access
- Shareable links with **12-hour expiry**
- MongoDB persistence

## Tech Stack

Node.js, Express.js, MongoDB, JWT, Multer, bcrypt

## Share Link Expiry

All generated links automatically expire after **12 hours**.

## Environment Variables (.env):

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
FRONTEND_URL=https://

## Git Clone

```bash
git clone "https://github.com/shamian84/Coshare-Backend.git"
```

## Run Backend

```bash
npm install
npm run dev
```
