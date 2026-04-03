import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">&#9670;</span>
          <span className="brand-text">CineVerse</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Movies</Link>
          {user ? (
            <>
              <Link to="/my-bookings" className="nav-link">My Bookings</Link>
              <div className="nav-user">
                <span className="nav-user-name">{user.name}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
