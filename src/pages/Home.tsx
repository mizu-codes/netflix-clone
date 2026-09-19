import { useAuth } from "../hooks/useAuth";

function Home() {
  const { user, loading } = useAuth();

  return (
    <div>
      <h1>Home</h1>

      <p>Loading: {loading ? "Yes" : "No"}</p>

      <p>User: {user ? user.email : "Not logged in"}</p>
    </div>
  );
}

export default Home;