import { useState } from "react";
import OtpForm from "../auth/OtpForm";
import ResetPassword from "../auth/ResetPassword";

const OtpModal = ({ email }) => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(null);

  return (
    <div className="modal-overlay fixed inset-0 bg-opacity-50 flex mt-10 justify-center">
      <div className="modal-content bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        {otpVerified ? (
          <>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
              Reset Password
            </h3>
            <ResetPassword email={email} otp={otp} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Enter OTP to Reset Password
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              Please enter the OTP sent to:
              <br />
              <span className="font-medium">{email}</span>
            </p>
            <OtpForm
              isVerificationEmail={false}
              setOtpVerified={setOtpVerified}
              setOtpValue={setOtp}
              email={email}
            />{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default OtpModal;
