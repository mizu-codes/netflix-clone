import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return <AppRoutes />;
}

export default App;