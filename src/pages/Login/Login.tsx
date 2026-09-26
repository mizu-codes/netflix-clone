import { useState, type SubmitEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { notify } from "../../utils/Notify";
import { getAuthErrorMessage } from "../../utils/Getautherrormessage";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      notify.success("Login successful");

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
    <div className="login">
      <img className="login-logo" src="/images/netfix.svg" alt="Netflix" />

      <div className="login-form">
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading}>
            Sign In
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
          New to Netflix? <Link to="/signup">Sign Up Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
