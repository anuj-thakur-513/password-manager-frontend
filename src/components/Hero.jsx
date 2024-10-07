import { useState } from "react";

const Hero = ({ handleGetStarted }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Wave Effect */}
        <div
          className="absolute w-96 h-96 bg-blue-700 rounded-full opacity-20 blur-3xl transition-transform duration-500"
          style={{
            left: `${mousePosition.x - 150}px`,
            top: `${mousePosition.y - 150}px`,
            transform: `translate(-50%, -50%) scale(1.5)`,
          }}
        ></div>

        {/* Hero Text */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 relative z-10">
          Secure Your Passwords with <span className="text-blue-400">Ease</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl relative z-10">
          Say goodbye to password anxiety. Manage all your passwords in one
          place with top-notch security and a sleek interface.
        </p>

        {/* Call-to-action Button */}
        <button
          className="btn bg-blue-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/50 transform transition duration-300 ease-in-out hover:scale-110 active:scale-95 relative z-10"
          onClick={handleGetStarted}
        >
          Get Started for Free
        </button>

        {/* Illustration */}
        <div className="mt-10 relative z-10 rounded-xl">
          <img
            src="./illustration.png"
            alt="Password Manager Illustration"
            className="w-full max-w-lg mx-auto rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
