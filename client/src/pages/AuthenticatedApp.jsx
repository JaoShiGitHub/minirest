import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";
import NotFoundPage from "./NotFoundPage";
import PlaceOrderPage from "./PlaceOrderPage";
import HistoryPage from "./HistoryPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order-now" element={<PlaceOrderPage />} />
        <Route path="/order-history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
