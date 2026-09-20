import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }

      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="login">
      <img
        className="login-logo"
        src="/public/images/netfix.svg"
        alt="Netflix"
      />

      <div className="login-form">
        <h1>Sign In</h1>

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
