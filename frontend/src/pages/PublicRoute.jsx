import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Authentication";

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    console.log("Public");

    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log("ok");
    return <Navigate to="/home" />;
  }

  return children;
}

export default PublicOnlyRoute;
