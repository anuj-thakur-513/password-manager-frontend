import { useRef, useState } from "react";
import { EMAIL_REGEX } from "../../constants";
import OtpModal from "../modals/OtpModal";
import axios from "axios";

const ResetPassword = () => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleSubmit = async () => {
    const enteredEmail = emailRef.current.value.trim();
    if (!enteredEmail || !EMAIL_REGEX.test(enteredEmail)) {
      setIsEmailValid(false);
      return;
    }
    await axios.post("/api/v1/user/generateOtp", {
      isVerificationEmail: false,
    });
    setEmail(enteredEmail);
    setShowOtpModal(true);
  };

  return (
    <>
      <div className={showOtpModal && "blur-xl"}>
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">
              Enter email address to receive OTP
            </h1>
          </div>
          <div className="form-group">
            <div className="form-field">
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
            <div className="form-field pt-5">
              <div className="form-control justify-between">
                <button
                  type="button"
                  className="btn btn-primary w-full hover:bg-blue-700 duration-200"
                  onClick={handleSubmit}
                >
                  Send OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOtpModal && <OtpModal email={email} />}
    </>
  );
};

export default ResetPassword;
