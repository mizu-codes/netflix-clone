import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <span>f</span>
        <span>◎</span>
        <span>𝕏</span>
        <span>▶</span>
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

      <p className="footer-copyright">
        © 2026 Netflix Clone
      </p>
    </footer>
  );
}

export default Footer;