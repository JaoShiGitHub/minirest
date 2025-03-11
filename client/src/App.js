import { useAuth } from "./contexts/Authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnAuthenticatedApp from "./pages/UnAuthenticatedApp";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;
