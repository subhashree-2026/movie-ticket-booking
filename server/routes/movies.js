import { Router } from "express";
import Movie from "../models/Movie.js";

const router = Router();

// Get all movies
router.get("/", async (_req, res) => {
  try {
    const movies = await Movie.find().select("-showtimes.bookedSeats");
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single movie with showtimes
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
