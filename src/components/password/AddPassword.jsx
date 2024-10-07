import axios from "axios";
import { useRef, useState } from "react";
import { EMAIL_REGEX } from "../../constants";
import { successToast } from "../../utils/toastMessage";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const AddPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPlatformNameMissing, setIsPlatformNameMissing] = useState(false);
  const [isUsernameMissing, setIsUsernameMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const platformNameRef = useRef(null);
  const platformUrlRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAddPassword = async () => {
    setLoading(true);
    const platformName = platformNameRef.current.value.trim();
    const platformUrl = platformUrlRef.current.value.trim();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!platformName || !username || !password) {
      setIsPlatformNameMissing(!platformName);
      setIsUsernameMissing(!username);
      setIsPasswordMissing(!password);
      setLoading(false);
      return;
    }

    try {
      let isEmail = false;
      if (EMAIL_REGEX.test(username)) {
        isEmail = true;
      }
      const res = await axios.post("/api/v1/password/add", {
        ...(isEmail ? { email: username } : { username: username }),
        password: password,
        platformName: platformName,
        ...(platformUrl && { platformUrl: platformUrl }),
      });

      if (res.status === 201) {
        successToast("Password added successfully");
      }
      if (res.status === 200) {
        successToast("Password updated successfully");
      }
      platformNameRef.current.value = "";
      platformUrlRef.current.value = "";
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-2 rounded-xl backdrop-blur-lg bg-opacity-50">
      <div className="p-8 shadow-lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="platform_name">
                Platform Name
              </label>
              <input
                className={`input input-solid ${
                  isPlatformNameMissing &&
                  "border-red-500 text-red-500 animate-shake"
                }`}
                placeholder="* Platform Name"
                type="text"
                ref={platformNameRef}
                id="platform_name"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="platform_url">
                Platform URL
              </label>
              <input
                className="input input-solid"
                placeholder="Platform URL"
                ref={platformUrlRef}
                type="text"
                id="platform_url"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="sr-only" htmlFor="username">
              Username/Email
            </label>
            <input
              className={`input input-solid max-w-full ${
                isUsernameMissing && "border-red-500 text-red-500 animate-shake"
              }`}
              placeholder="* Username/Email"
              ref={usernameRef}
              type="text"
              id="username"
            />
          </div>
          <div className="w-full form-control">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className={`input input-solid max-w-full ${
                isPasswordMissing && "border-red-500 text-red-500 animate-shake"
              }`}
              placeholder="* Password"
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              id="password"
            />
            <span
              className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <h3 className="text-red-500 text-center">⚠️ {error}</h3>}
          <div className="mt-4">
            {!loading ? (
              <button
                type="button"
                className="rounded-lg btn btn-primary btn-block hover:bg-blue-700 duration-200"
                onClick={handleAddPassword}
              >
                Add Password
              </button>
            ) : (
              <div className="flex justify-center w-full pb-5">
                <div className="spinner-dot-pulse">
                  <div className="spinner-pulse-dot"></div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
export default AddPassword;
