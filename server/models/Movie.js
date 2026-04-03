import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: [String],
    duration: { type: Number, required: true }, // in minutes
    rating: { type: Number, default: 0 },
    poster: { type: String, required: true },
    banner: { type: String },
    releaseDate: { type: Date },
    language: { type: String, default: "English" },
    showtimes: [
      {
        date: { type: String, required: true },
        time: { type: String, required: true },
        hall: { type: String, default: "Hall 1" },
        price: { type: Number, required: true },
        totalSeats: { type: Number, default: 60 },
        bookedSeats: [String],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
