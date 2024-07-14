import { useState } from "react";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div className="vw-100 container d-flex justify-content-center align-items-center">
      <form className="w-50">
        <h3>Login</h3>
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
            className="form-control w-100"
            placeholder="Enter password"
          />
        </div>
        {errorMessage && (
          <p className="p-2 ps-3 bg-danger rounded text-white text-wrap text-start w-100">
            {errorMessage}
          </p>
        )}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-25">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
