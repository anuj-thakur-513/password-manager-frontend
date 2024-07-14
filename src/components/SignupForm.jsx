import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div className="vw-100 container d-flex justify-content-center align-items-center">
      <form className="w-50">
        <h3>Sign Up</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
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
          <button type="submit" className="btn btn-primary w-50">
            Sign Up
          </button>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button type="button" className="btn btn-outline-success w-50">
            <FontAwesomeIcon icon={faGoogle} className="me-2" />
            Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
