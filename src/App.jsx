import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import "./index.css";

// Lazy load
const Auth = lazy(() => import("./pages/Auth"));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
