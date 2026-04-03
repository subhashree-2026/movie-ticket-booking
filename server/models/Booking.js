import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    showtimeId: { type: String, required: true },
    seats: [String],
    totalAmount: { type: Number, required: true },
    movieTitle: { type: String },
    showDate: { type: String },
    showTime: { type: String },
    hall: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
