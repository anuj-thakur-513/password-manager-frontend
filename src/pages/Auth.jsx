import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

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
