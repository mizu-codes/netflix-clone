import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { notify } from "../../utils/Notify";
import { getAuthErrorMessage } from "../../utils/Getautherrormessage";
import "./Signup.css";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);

      notify.success("Account created successfully");

      navigate("/");
    } catch (error) {
      const message = getAuthErrorMessage(error);

      setError(message);
      notify.error(message);

      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="signup">
      <img
        className="signup-logo"
        src="/images/netfix.svg"
        alt="Netflix"
      />

      <div className="signup-form">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          {error && <p className="signup-error">{error}</p>}

          <button type="submit" disabled={loading}>
            Sign Up
          </button>

          <div className="form-help">
            <label className="remember">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>

            <span>Need Help?</span>
          </div>
        </form>

        <p className="form-switch">
          Already have an account? <Link to="/login">Sign In Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
