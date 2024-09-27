import { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import EmailVerification from "../components/auth/EmailVerification";
import ResetPassword from "../components/auth/ResetPassword";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  return (
    <div className="mt-52">
      {showOtpForm ? (
        <EmailVerification email={enteredEmail} />
      ) : showResetPasswordForm ? (
        <ResetPassword />
      ) : isLogin ? (
        <Login
          setIsLogin={setIsLogin}
          setShowOtpForm={setShowOtpForm}
          setShowResetPasswordForm={setShowResetPasswordForm}
        />
      ) : (
        <Signup
          setIsLogin={setIsLogin}
          setShowOtpForm={setShowOtpForm}
          setEnteredEmail={setEnteredEmail}
        />
      )}
    </div>
  );
};

export default Auth;
