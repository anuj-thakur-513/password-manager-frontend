import axios from "axios";
import { useRef, useState } from "react";

const ResetPassword = ({ email, otp }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleShowNewPassword = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };
  const handleShowConfirmPassword = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const newPassword = newPasswordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value;
    if (!newPassword || !confirmPassword) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.patch("/api/v1/user/reset-otp-password", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      if (res.status === 200) {
        window.location.href = "/";
      }
    } catch (e) {
      setError("Failed to update password, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Set new Password</h1>
      </div>
      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Enter new Password</label>
          <div className="form-control">
            <input
              ref={newPasswordRef}
              placeholder="Enter your new password"
              type={isNewPasswordVisible ? "text" : "password"}
              className="input max-w-full focus:border-blue-500"
            />
            <span
              className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
              onClick={handleShowNewPassword}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-content3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Re-Enter new Password</label>
          <div className="form-control">
            <input
              ref={confirmPasswordRef}
              placeholder="Re-Enter your new password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              className="input max-w-full focus:border-blue-500"
            />
            <span
              className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-content3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        {error && (
          <p className="form-label">
            <span className="text-red-500">{error}</span>
          </p>
        )}
        <div className="form-field pt-5">
          <div className="form-control justify-between">
            {!loading ? (
              <button
                type="button"
                className="btn btn-primary w-full hover:bg-blue-700 duration-200"
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            ) : (
              <div className="flex justify-center w-full pb-5">
                <div className="spinner-dot-pulse">
                  <div className="spinner-pulse-dot"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
