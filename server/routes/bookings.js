import { Router } from "express";
import Movie from "../models/Movie.js";
import Booking from "../models/Booking.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Create booking
router.post("/", auth, async (req, res) => {
  try {
    const { movieId, showtimeId, seats } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const showtime = movie.showtimes.id(showtimeId);
    if (!showtime) return res.status(404).json({ message: "Showtime not found" });

    // Check if seats are already booked
    const alreadyBooked = seats.filter((s) => showtime.bookedSeats.includes(s));
    if (alreadyBooked.length > 0) {
      return res.status(400).json({ message: `Seats ${alreadyBooked.join(", ")} already booked` });
    }

    // Mark seats as booked
    showtime.bookedSeats.push(...seats);
    await movie.save();

    const booking = await Booking.create({
      user: req.userId,
      movie: movieId,
      showtimeId,
      seats,
      totalAmount: seats.length * showtime.price,
      movieTitle: movie.title,
      showDate: showtime.date,
      showTime: showtime.time,
      hall: showtime.hall,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's bookings
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
