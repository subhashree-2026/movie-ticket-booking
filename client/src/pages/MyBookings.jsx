import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./MyBookings.css";

const API = import.meta.env.VITE_API_URL;

export default function MyBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>{bookings.length} booking{bookings.length !== 1 ? "s" : ""}</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bookings-empty">
          <div className="empty-icon">&#127916;</div>
          <h3>No bookings yet</h3>
          <p>Start by browsing our movies and booking your first show!</p>
          <Link to="/" className="btn-primary">Browse Movies</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div className="booking-card-left">
                <div className="booking-movie-title">{b.movieTitle}</div>
                <div className="booking-meta">
                  <span>{b.showDate}</span>
                  <span className="dot">&middot;</span>
                  <span>{b.showTime}</span>
                  <span className="dot">&middot;</span>
                  <span>{b.hall}</span>
                </div>
              </div>
              <div className="booking-card-center">
                <div className="booking-seats-label">Seats</div>
                <div className="booking-seats">
                  {b.seats.map((s) => (
                    <span key={s} className="seat-chip">{s}</span>
                  ))}
                </div>
              </div>
              <div className="booking-card-right">
                <div className="booking-amount">&#8377;{b.totalAmount}</div>
                <div className="booking-date">
                  Booked {new Date(b.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
