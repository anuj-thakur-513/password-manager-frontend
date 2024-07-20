import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";
import UserAuthContext from "../context/UserAuthContext.js";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const userAuth = useContext(UserAuthContext);
  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/v1/user/checkAuth");
      if (res.status === 200) {
        userAuth.setIsAuthenticated(true);
      } else {
        userAuth.setIsAuthenticated(false);
      }
    } catch (error) {
      userAuth.setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth();
    };
    fetchAuth();
  }, []);

  const toggleSignIn = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        {isLogin ? <LoginForm /> : <SignUpForm />}
      </div>
      <div className="mt-3">
        <Link
          className="link-underline link-underline-opacity-0 link-underline-opacity-50-hover"
          to={"/#"}
          onClick={toggleSignIn}
        >
          {isLogin ? "Sign Up" : "Login"}
        </Link>
      </div>
    </>
  );
};

export default Auth;
