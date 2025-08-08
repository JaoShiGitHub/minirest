import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";
import NotFoundPage from "./NotFoundPage";
import ProfilePage from "./ProfilePage";
import { HistoryPage } from "./HistoryPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
