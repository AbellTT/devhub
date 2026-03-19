import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";

import ProtectedRoute from "./components/layout/ProtectedRoute";
import GuestRoute from "./components/layout/GuestRoute";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* 🛡️ Guest Only Routes (If logged in, redirects to feed) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* 🔒 Protected Routes (If not logged in, redirects to login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<FeedPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
