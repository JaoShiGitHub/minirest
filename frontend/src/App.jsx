import { useAuth } from "./contexts/Authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnAuthenticatedApp from "./pages/UnAuthenticatedApp";

function App() {
  const auth = useAuth();
  return (
    <div className="bg-background min-h-screen">
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
