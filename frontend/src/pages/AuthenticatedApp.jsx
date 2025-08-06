import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./customer/HomePage";
import MenuPage from "./customer/MenuPage";
import NotFoundPage from "./customer/NotFoundPage";
import OrderReceivedPage from "./customer/OrderReceivedPage";
import { HistoryPage } from "./customer/HistoryPage";
import ProfilePage from "./customer/ProfilePage";
import ProtectedRoute from "./customer/ProtectedRoute";
import LoginPage from "./customer/LoginPage";
import RegisterPage from "./customer/RegisterPage";

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
