import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import "./index.css";

// Lazy load
const Auth = lazy(() => import("./pages/Auth"));

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
