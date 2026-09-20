import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiBell, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { notify } from "../../utils/Notify";
import "./Navbar.css";

const NAV_LINKS = [
  "Shows",
  "Movies",
  "Games",
  "New & Popular",
  "My Netflix",
  "Browse by Languages",
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      notify.success("Signed out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      notify.error("Something went wrong while signing out.");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <img
          className="navbar-logo"
          src="/public/images/netfix.svg"
          alt="Netflix"
        />

        <div className="navbar-links">
          <Link to="/" className="navbar-home" onClick={closeMenu}>
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
      </div>

      <div className="navbar-actions">
        <FiSearch className="navbar-action" />
        <FiBell className="navbar-action" />

        <div className="profile-menu" ref={profileRef}>
          <button
            className="profile-button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
          >
            <img
              src="/public/images/profile-icon.png"
              alt="Profile"
              className="profile-image"
            />
            <FiChevronDown
              className={`profile-arrow ${profileOpen ? "open" : ""}`}
            />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Sign out of Netflix</button>
            </div>
          )}
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          <Link to="/" className="navbar-mobile-home" onClick={closeMenu}>
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <span key={link} onClick={closeMenu}>
              {link}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
