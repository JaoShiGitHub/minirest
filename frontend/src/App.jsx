import { useAuth } from "./contexts/Authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnAuthenticatedApp from "./pages/UnAuthenticatedApp";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-background min-h-screen pb-20">
      {isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
