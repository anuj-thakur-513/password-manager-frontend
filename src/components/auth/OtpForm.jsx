import axios from "axios";
import { useState, useRef, useEffect } from "react";

const OtpForm = ({
  isVerificationEmail,
  setOtpVerified = () => {},
  setOtpValue = () => {},
  email = null,
}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30); // 30-second countdown
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Start the countdown on component mount
  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown); // Cleanup the interval
    }

    if (timer === 0) {
      setIsResendDisabled(false); // Enable resend when timer reaches 0
    }
  }, [timer, isResendDisabled]);

  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^[0-9]{6}$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);
    inputRefs.current[5].focus();
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("OTP submitted:", otpValue);
    let res;
    try {
      if (isVerificationEmail) {
        res = await axios.patch("/api/v1/user/verifyOtp", {
          enteredOtp: otpValue,
        });
      } else {
        res = await axios.patch("/api/v1/user/verify-reset-otp", {
          enteredOtp: otpValue,
          email,
        });
      }
      if (res.status === 200) {
        const user = JSON.parse(window.localStorage.getItem("user"));
        if (user) {
          user.isVerified = true;
          window.localStorage.setItem("user", JSON.stringify(user));
        }
        setOtpVerified(true);
        setOtpValue(otpValue);
        if (isVerificationEmail) {
          window.location.href = "/home";
        }
      }
    } catch (e) {
      setError("OTP Verification failed");
      setOtpValue(null);
      setOtpVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!isResendDisabled) {
      try {
        const res = await axios.post("/api/v1/user/generateOtp", {
          isVerificationEmail,
        });
        if (res.status === 200) {
          setError(null);
        }
      } catch (error) {
        if (error.response.status === 429) {
          setError("Request Limit Reached! Please try again after 10 minutes.");
        }
      }
      setIsResendDisabled(true);
      setTimer(30);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-extrabold text-white bg-gray-700 border border-gray-600 hover:border-gray-500 appearance-none rounded p-3 outline-none focus:bg-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition-colors duration-200"
              maxLength={1}
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-6">
          {!loading ? (
            <button
              type="submit"
              className="w-full btn btn-primary hover:bg-blue-700 duration-200"
            >
              Verify Account
            </button>
          ) : (
            <div className="flex justify-center w-full pb-5">
              <div className="spinner-dot-pulse">
                <div className="spinner-pulse-dot"></div>
              </div>
            </div>
          )}
        </div>
      </form>
      <div className="text-sm text-gray-400 mt-4">
        Didn't receive code?{" "}
        <button
          onClick={handleResend}
          className={`link link-underline-hover link-primary text-sm ${
            isResendDisabled ? "cursor-not-allowed text-gray-500" : ""
          }`}
          disabled={isResendDisabled}
        >
          Resend {isResendDisabled && `(${timer}s)`}
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default OtpForm;
