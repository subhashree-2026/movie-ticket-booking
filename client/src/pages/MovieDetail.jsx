import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./MovieDetail.css";

const API = import.meta.env.VITE_API_URL;

export default function MovieDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/movies/${id}`)
      .then((r) => r.json())
      .then(setMovie)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return <div className="empty"><p>Movie not found.</p></div>;
  }

  // Group showtimes by date
  const grouped = {};
  movie.showtimes.forEach((st) => {
    if (!grouped[st.date]) grouped[st.date] = [];
    grouped[st.date].push(st);
  });

  return (
    <div className="movie-detail">
      <div
        className="movie-banner"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 30%, var(--bg-primary) 100%), url(${movie.banner || movie.poster})`,
        }}
      />

      <div className="movie-detail-content">
        <div className="movie-detail-top">
          <div className="movie-detail-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>
          <div className="movie-detail-info">
            <h1 className="movie-detail-title">{movie.title}</h1>
            <div className="movie-detail-badges">
              {movie.genre.map((g) => (
                <span key={g} className="badge">{g}</span>
              ))}
              <span className="badge badge-lang">{movie.language}</span>
            </div>
            <div className="movie-detail-stats">
              <div className="stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">
                  <span style={{ color: "#ffd700" }}>&#9733;</span> {movie.rating}/10
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Duration</span>
                <span className="stat-value">
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Release</span>
                <span className="stat-value">
                  {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <p className="movie-detail-desc">{movie.description}</p>
          </div>
        </div>

        <div className="showtimes-section">
          <h2 className="showtimes-title">Select Showtime</h2>
          {Object.entries(grouped).map(([date, shows]) => (
            <div key={date} className="showtime-date-group">
              <h3 className="showtime-date">
                {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="showtime-cards">
                {shows.map((st) => {
                  const available = st.totalSeats - st.bookedSeats.length;
                  return (
                    <Link
                      key={st._id}
                      to={user ? `/book/${movie._id}/${st._id}` : "/login"}
                      className={`showtime-card ${available === 0 ? "sold-out" : ""}`}
                    >
                      <span className="showtime-time">{st.time}</span>
                      <span className="showtime-hall">{st.hall}</span>
                      <span className="showtime-price">&#8377;{st.price}</span>
                      <span className={`showtime-avail ${available < 10 ? "low" : ""}`}>
                        {available === 0
                          ? "Sold Out"
                          : `${available} seats left`}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
