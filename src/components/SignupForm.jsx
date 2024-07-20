import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleSignUpWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/v1/user/google/auth";
  };

  return (
    <div className="vw-100 container d-flex justify-content-center align-items-center">
      <form className="w-50" onSubmit={(e) => e.preventDefault()}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <input
            type="text"
            ref={fullName}
            className="form-control"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            ref={email}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            ref={password}
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            ref={confirmPassword}
            className="form-control"
            placeholder="Re-Enter password"
          />
        </div>
        {errorMessage && (
          <p className="p-2 ps-3 bg-danger rounded text-white text-wrap text-start w-100">
            {errorMessage}
          </p>
        )}
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={isAuthenticating}
          >
            Sign Up
          </button>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-outline-success w-50"
            onClick={handleSignUpWithGoogle}
            disabled={isAuthenticating}
          >
            <FontAwesomeIcon icon={faGoogle} className="me-2" />
            Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
