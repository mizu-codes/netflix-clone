import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <img className="navbar-logo" src="/images/netflix.svg" alt="Netflix" />

      <div className="navbar-links">
        <span className="navbar-home">Home</span>
        <span>Shows</span>
        <span>Movies</span>
        <span>Games</span>
        <span>New & Popular</span>
        <span>My Netflix</span>
        <span>Browse by Languages</span>
      </div>

      <div className="navbar-actions">
        <span className="navbar-action">⌕</span>
        <span className="navbar-action">🔔</span>
        <span className="navbar-action">😊</span>

        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
