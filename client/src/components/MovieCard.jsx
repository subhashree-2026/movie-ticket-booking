import { Link } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie._id}`} className="movie-card">
      <div className="movie-card-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-card-overlay">
          <span className="movie-card-view">View Details</span>
        </div>
        <div className="movie-card-rating">
          <span>&#9733;</span> {movie.rating}
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span className="movie-card-genre">
            {movie.genre.slice(0, 2).join(" / ")}
          </span>
          <span className="movie-card-duration">{movie.duration} min</span>
        </div>
        <div className="movie-card-lang">{movie.language}</div>
      </div>
    </Link>
  );
}
