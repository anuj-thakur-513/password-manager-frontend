import OtpForm from "../auth/OtpForm";

const OtpModal = ({ email }) => {
  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Enter OTP to Reset Password
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Please enter the OTP sent to:
          <br />
          <span className="font-medium">{email}</span>
        </p>
        <OtpForm />
      </div>
    </div>
  );
};

export default OtpModal;