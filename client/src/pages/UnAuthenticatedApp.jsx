import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";

function UnAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnAuthenticatedApp;
