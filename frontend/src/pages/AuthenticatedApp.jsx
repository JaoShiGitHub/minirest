import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";
import NotFoundPage from "./NotFoundPage";
import OrderReceivedPage from "./OrderReceivedPage";
import { HistoryPage } from "./HistoryPage";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <MenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-received"
          element={
            <ProtectedRoute>
              <OrderReceivedPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
