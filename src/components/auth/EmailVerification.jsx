import OtpForm from "./OtpForm";

const EmailVerification = ({ email }) => {
  return (
    <div className="max-w-md mx-auto text-center bg-gray-800 px-4 sm:px-8 py-10 rounded-xl shadow-lg">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1 text-white">
          Email Verification
        </h1>
        <p className="text-[15px] text-gray-400">
          Enter the 6-digit verification code that was sent to {email}.
        </p>
      </header>
      <OtpForm isVerificationEmail={true} />
    </div>
  );
};

export default EmailVerification;
