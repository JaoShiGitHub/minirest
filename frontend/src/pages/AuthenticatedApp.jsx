import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";
import NotFoundPage from "./NotFoundPage";
import PlaceOrderPage from "./PlaceOrderPage";

import OrderReceivedPage from "./OrderReceivedPage";
import ViewOrder from "./ViewOrder";
import { HistoryPage } from "./HistoryPage";
import ProfilePage from "./ProfilePage";
import InsertMenu from "./InsertMenuPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order-now" element={<PlaceOrderPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/order-received" element={<OrderReceivedPage />} />
        <Route path="/view-order" element={<ViewOrder />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/insert-menu" element={<InsertMenu />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
