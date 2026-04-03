# API Keys & Services Setup Guide

This guide walks you through getting all the keys/URIs needed to run the app.

---

## 1. MongoDB Atlas (Database) — REQUIRED

You need a MongoDB connection string (URI) to store users, movies, and bookings.

### Steps:

1. **Go to** [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a free account** (or sign in if you already have one)

3. **Create a new project** (or use the default one)

4. **Create a free cluster:**
   - Click **"Build a Database"**
   - Select **M0 Free Tier**
   - Choose a cloud provider & region closest to you
   - Click **"Create Deployment"**

5. **Create a database user:**
   - You'll be prompted to create a user right after cluster creation
   - Set a **username** and **password**
   - Click **"Create Database User"**
   - **IMPORTANT:** Remember this username and password — you'll need them for the URI

6. **Set up network access:**
   - You'll be prompted to add your IP
   - For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - Click **"Add Entry"**
   - For production, restrict to your server's IP

7. **Get your connection string:**
   - Go to **Database** → Click **"Connect"** on your cluster
   - Choose **"Drivers"**
   - Copy the connection string. It looks like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Replace** `<username>` with your database username
   - **Replace** `<password>` with your database password
   - **Add your database name** before the `?`:
     ```
     mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/movie-ticket-booking?retryWrites=true&w=majority
     ```

8. **Paste it** into `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/movie-ticket-booking?retryWrites=true&w=majority
   ```

---

## 2. JWT Secret — REQUIRED

This is not an API key — it's just a random string used to sign authentication tokens.

### Steps:

1. **Generate any random string.** You can use one of these methods:

   **Option A — Use Node.js:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   **Option B — Just make one up:**
   ```
   my_super_secret_jwt_key_2024_cineverse
   ```

2. **Paste it** into `server/.env`:
   ```env
   JWT_SECRET=your_generated_secret_here
   ```

---

## Summary Checklist

| Key            | Where to get it                        | Put it in       |
| -------------- | -------------------------------------- | --------------- |
| `MONGODB_URI`  | MongoDB Atlas → Connect → Drivers      | `server/.env`   |
| `JWT_SECRET`   | Generate a random string               | `server/.env`   |
| `VITE_API_URL` | Already set (http://localhost:5000/api) | `client/.env`   |

---

## Your final `server/.env` should look like:

```env
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/movie-ticket-booking?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0_your_random_secret
PORT=5000
```

## Your `client/.env` should look like:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Troubleshooting

- **"MongoServerError: bad auth"** → Double-check your username/password in the URI. Make sure there are no special characters that need URL encoding.
- **"MongoNetworkError"** → Go to MongoDB Atlas → Network Access → Make sure your IP is whitelisted (or `0.0.0.0/0` for development).
- **"ECONNREFUSED"** → Make sure the backend server is running on port 5000.
