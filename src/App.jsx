import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import "./index.css";
import axios from "axios";

// Lazy load
const Auth = lazy(() => import("./pages/Auth"));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
