import axios from "axios";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("/api/v1/user/checkAuth");
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res?.data?.data));
          if (
            !res?.data?.data?.isVerified &&
            window.location.pathname !== "/"
          ) {
            window.location.href = "/";
          }
          if (res?.data?.data?.isVerified && window.location.pathname === "/") {
            window.location.href = "/home";
          }
        }
      } catch (e) {
        localStorage.removeItem("user");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    }
    getUser();
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
