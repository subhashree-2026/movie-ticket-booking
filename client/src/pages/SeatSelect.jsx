import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./SeatSelect.css";

const API = import.meta.env.VITE_API_URL;

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COLS = [1, 2, 3, 4, 5, 6];

export default function SeatSelect() {
  const { movieId, showtimeId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/movies/${movieId}`)
      .then((r) => r.json())
      .then((data) => {
        setMovie(data);
        const st = data.showtimes.find((s) => s._id === showtimeId);
        setShowtime(st);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [movieId, showtimeId]);

  const toggleSeat = (seatId) => {
    if (showtime.bookedSeats.includes(seatId)) return;
    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : prev.length < 8
          ? [...prev, seatId]
          : prev
    );
  };

  const handleBook = async () => {
    if (selected.length === 0) return;
    setBooking(true);
    setError("");
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId, showtimeId, seats: selected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading seats...</p>
      </div>
    );
  }

  if (!movie || !showtime) {
    return <div className="empty"><p>Showtime not found.</p></div>;
  }

  if (success) {
    return (
      <div className="booking-success">
        <div className="success-card">
          <div className="success-icon">&#10003;</div>
          <h2>Booking Confirmed!</h2>
          <div className="success-details">
            <div className="success-row">
              <span>Movie</span>
              <strong>{success.movieTitle}</strong>
            </div>
            <div className="success-row">
              <span>Date</span>
              <strong>{success.showDate}</strong>
            </div>
            <div className="success-row">
              <span>Time</span>
              <strong>{success.showTime}</strong>
            </div>
            <div className="success-row">
              <span>Hall</span>
              <strong>{success.hall}</strong>
            </div>
            <div className="success-row">
              <span>Seats</span>
              <strong>{success.seats.join(", ")}</strong>
            </div>
            <div className="success-row total">
              <span>Total</span>
              <strong>&#8377;{success.totalAmount}</strong>
            </div>
          </div>
          <div className="success-actions">
            <button onClick={() => navigate("/my-bookings")} className="btn-primary">
              View My Bookings
            </button>
            <button onClick={() => navigate("/")} className="btn-secondary">
              Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="seat-page">
      <div className="seat-page-inner">
        <div className="seat-left">
          <div className="seat-movie-info">
            <h2>{movie.title}</h2>
            <p>
              {showtime.date} &middot; {showtime.time} &middot; {showtime.hall}
            </p>
          </div>

          <div className="screen-container">
            <div className="screen">
              <span>SCREEN</span>
            </div>
          </div>

          <div className="seat-grid">
            {ROWS.map((row) => (
              <div key={row} className="seat-row">
                <span className="row-label">{row}</span>
                {COLS.map((col) => {
                  const id = `${row}${col}`;
                  const isBooked = showtime.bookedSeats.includes(id);
                  const isSelected = selected.includes(id);
                  return (
                    <button
                      key={id}
                      className={`seat ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleSeat(id)}
                      disabled={isBooked}
                      title={id}
                    >
                      {col}
                    </button>
                  );
                })}
                <span className="row-label">{row}</span>
              </div>
            ))}
          </div>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="seat-demo available" />
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="seat-demo selected" />
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="seat-demo booked" />
              <span>Booked</span>
            </div>
          </div>
        </div>

        <div className="seat-right">
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-poster">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="summary-details">
              <div className="summary-row">
                <span>Movie</span>
                <span>{movie.title}</span>
              </div>
              <div className="summary-row">
                <span>Show</span>
                <span>{showtime.time}</span>
              </div>
              <div className="summary-row">
                <span>Hall</span>
                <span>{showtime.hall}</span>
              </div>
              <div className="summary-row">
                <span>Seats</span>
                <span>{selected.length > 0 ? selected.join(", ") : "None"}</span>
              </div>
              <div className="summary-row">
                <span>Price/seat</span>
                <span>&#8377;{showtime.price}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>&#8377;{selected.length * showtime.price}</span>
              </div>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button
              className="btn-book"
              onClick={handleBook}
              disabled={selected.length === 0 || booking}
            >
              {booking
                ? "Booking..."
                : selected.length === 0
                  ? "Select seats to continue"
                  : `Book ${selected.length} Seat${selected.length > 1 ? "s" : ""}`}
            </button>
            <p className="max-note">Max 8 seats per booking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
