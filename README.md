# CineVerse - Movie Ticket Booking App

A full-stack movie ticket booking application built with React, Express, and MongoDB. Features a dark aesthetic theme with black, blue, and sky blue accents.

## Features

- User authentication (Signup / Login)
- Browse movies with search & filter
- View movie details and showtimes
- Interactive seat selection
- Booking confirmation
- View booking history

## Tech Stack

- **Frontend:** React 19 + Vite, React Router, CSS
- **Backend:** Node.js, Express, JWT Auth
- **Database:** MongoDB (via Mongoose)

---

## Quick Start

### 1. Clone & Setup Environment

```bash
# Clone the repo (if needed)
cd movie-ticket-booking

# Setup server environment
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and a JWT secret
```

If there's no `.env.example`, create `server/.env` manually:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/movie-ticket-booking?retryWrites=true&w=majority
JWT_SECRET=any_random_secret_string_here
PORT=5000
```

The client `.env` is already set up:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Run the App

Open **two terminals**:

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Project Structure

```
movie-ticket-booking/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Navbar, MovieCard
│   │   ├── context/        # AuthContext (JWT auth state)
│   │   ├── pages/          # Home, Login, Signup, MovieDetail, SeatSelect, MyBookings
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css       # Global styles & theme variables
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── server/                 # Express backend
│   ├── middleware/          # JWT auth middleware
│   ├── models/             # User, Movie, Booking (Mongoose)
│   ├── routes/             # auth, movies, bookings
│   ├── seed.js             # Sample movie data (auto-seeds on first run)
│   ├── server.js
│   ├── .env
│   └── package.json
├── API_KEYS_SETUP.md       # Step-by-step guide to get all API keys
└── README.md
```

---

## API Endpoints

| Method | Endpoint            | Auth | Description           |
| ------ | ------------------- | ---- | --------------------- |
| POST   | /api/auth/signup    | No   | Create new account    |
| POST   | /api/auth/login     | No   | Login                 |
| GET    | /api/auth/me        | Yes  | Get current user      |
| GET    | /api/movies         | No   | List all movies       |
| GET    | /api/movies/:id     | No   | Get movie details     |
| POST   | /api/bookings       | Yes  | Create a booking      |
| GET    | /api/bookings/my    | Yes  | Get user's bookings   |
