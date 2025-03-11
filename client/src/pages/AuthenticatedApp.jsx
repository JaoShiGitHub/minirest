import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
