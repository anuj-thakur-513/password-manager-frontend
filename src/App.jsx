// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Header from "./components/Header";
import UserAuthContext from "./context/UserAuthContext";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <UserAuthContext.Provider
        value={{ isAuthenticated: isAuthenticated, setIsAuthenticated }}
      >
        <Header />
        <div className="body-content">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </UserAuthContext.Provider>
    </>
  );
}

export default App;
