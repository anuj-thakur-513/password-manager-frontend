import { useEffect, useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import EmailVerification from "../components/auth/EmailVerification";
import RequestOtp from "../components/auth/RequestOtp";
import Hero from "../components/Hero";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [showAuthForms, setShowAuthForms] = useState(false);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user && !user.isVerified) {
      setShowConfirmMessage(true);
    }
  }, []);

  const handleGetStarted = () => {
    setShowAuthForms(true);
  };

  return (
    <>
      {showAuthForms ? (
        <div
          className={`mt-52 h-screen ${showAuthForms ? "animate-slideIn" : ""}`}
        >
          {showOtpForm ? (
            <EmailVerification email={enteredEmail} />
          ) : showResetPasswordForm ? (
            <RequestOtp />
          ) : isLogin ? (
            <Login
              setIsLogin={setIsLogin}
              setShowOtpForm={setShowOtpForm}
              setShowResetPasswordForm={setShowResetPasswordForm}
              setEnteredEmail={setEnteredEmail}
            />
          ) : (
            <Signup
              setIsLogin={setIsLogin}
              setShowOtpForm={setShowOtpForm}
              setEnteredEmail={setEnteredEmail}
            />
          )}
          {showConfirmMessage && !showOtpForm && !showResetPasswordForm && (
            <h2 className="text-warning flex justify-center mt-4">
              ⚠️ Re-login and verify your account to proceed
            </h2>
          )}
        </div>
      ) : (
        <Hero handleGetStarted={handleGetStarted} />
      )}
    </>
  );
};

export default Auth;
