import { useRef, useState } from "react";
import { EMAIL_REGEX } from "../../constants";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Signup = ({ setIsLogin, setShowOtpForm, setEnteredEmail }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setIsEmailValid(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsEmailValid(true);
    setEnteredEmail(email);

    try {
      setLoading(true);
      const res = await axios.post("/api/v1/user/signup", {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        const user = res?.data?.data?.updatedUser;
        window.localStorage.setItem("user", JSON.stringify(user));
        await axios.post("/api/v1/user/generateOtp", {
          isVerificationEmail: true,
        });
        setShowOtpForm(true);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
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
          <label className="form-label">Name</label>
          <input
            ref={nameRef}
            placeholder="John Doe"
            type="text"
            className="input max-w-full focus:border-blue-500"
          />
          <label className="form-label">Email address</label>
          <input
            ref={emailRef}
            placeholder="example@gmail.com"
            type="email"
            className="input max-w-full focus:border-blue-500"
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
              className="input max-w-full focus:border-blue-500"
            />
            <span
              className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
              onClick={handleShowPassword}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
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
              className="input max-w-full focus:border-blue-500"
            />
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
                Sign up
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

        <div className="form-field">
          <div className="form-control justify-center">
            <a
              className={`link link-underline-hover link-primary text-sm ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={
                loading
                  ? null
                  : () => {
                      setIsLogin(true);
                    }
              }
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
