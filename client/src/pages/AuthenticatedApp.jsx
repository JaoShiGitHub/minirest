import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
