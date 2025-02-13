import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import "./index.css";
import Home from "./pages/Home";

// Lazy load
const Auth = lazy(() => import("./pages/Auth"));

function App() {
  return (
    <>
      <div className="bg-global-gradient">
        <Header />
        <ToastContainer />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
