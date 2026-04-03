import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import "./Home.css";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/movies`)
      .then((r) => r.json())
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.genre.some((g) => g.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <h1 className="hero-title">
            Book Your <span className="hero-highlight">Movie Experience</span>
          </h1>
          <p className="hero-subtitle">
            Discover and book tickets for the latest blockbusters
          </p>
          <div className="search-box">
            <span className="search-icon">&#128269;</span>
            <input
              type="text"
              placeholder="Search movies, genres..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      <section className="movies-section">
        <div className="section-header">
          <h2 className="section-title">Now Showing</h2>
          <span className="movie-count">{filtered.length} movies</span>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <p>Loading movies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <p>No movies found. Try a different search.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {filtered.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
