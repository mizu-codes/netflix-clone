import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-socials">
          <span className="footer-social-icon" aria-hidden="true">
            <FaFacebookF />
          </span>
          <span className="footer-social-icon" aria-hidden="true">
            <FaInstagram />
          </span>
          <span className="footer-social-icon" aria-hidden="true">
            <FaTwitter />
          </span>
          <span className="footer-social-icon" aria-hidden="true">
            <FaYoutube />
          </span>
        </div>

        <div className="footer-links">
          <div>
            <span>Audio Description</span>
            <span>Investor Relations</span>
            <span>Legal Notices</span>
          </div>

          <div>
            <span>Help Centre</span>
            <span>Jobs</span>
            <span>Cookie Preferences</span>
          </div>

          <div>
            <span>Gift Cards</span>
            <span>Terms of Use</span>
            <span>Corporate Information</span>
          </div>

          <div>
            <span>Media Centre</span>
            <span>Privacy</span>
            <span>Contact Us</span>
          </div>
        </div>

        <p className="footer-copyright">© 2026 Netflix, Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
