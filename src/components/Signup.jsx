import { useRef, useState } from "react";
import { EMAIL_REGEX } from "../constants";

const Signup = ({ setIsLogin }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!EMAIL_REGEX.test(email)) {
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);
    // TODO: handle SIGNUP API call
    setIsAuthenticated(true);
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
      </div>
      <div className="form-group">
        <div className="form-field">
          <label className="form-label">Email address</label>
          <input
            ref={emailRef}
            placeholder="example@gmail.com"
            type="email"
            className="input max-w-full"
          />
          {!isEmailValid && (
            <label className="form-label">
              <span className="form-label-alt text-red-500">
                Please enter a valid email
              </span>
            </label>
          )}
        </div>
        <div className="form-field">
          <label className="form-label">Password</label>
          <div className="form-control">
            <input
              ref={passwordRef}
              placeholder="Enter your password"
              type={isPasswordVisible ? "text" : "password"}
              className="input max-w-full"
            />
            <span
              className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
              onClick={handleShowPassword}
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
          <label className="form-label">Confirm Password</label>
          <div className="form-control">
            <input
              ref={confirmPasswordRef}
              placeholder="Re-Enter password"
              type={"password"}
              className="input max-w-full"
            />
          </div>
        </div>
        <div className="form-field pt-5">
          <div className="form-control justify-between">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </div>

        <div className="form-field">
          <div className="form-control justify-center">
            <a
              className="link link-underline-hover link-primary text-sm"
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Already a User? Sign in.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
