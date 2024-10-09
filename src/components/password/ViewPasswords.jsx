import axios from "axios";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { errorToast, successToast } from "../../utils/toastMessage";
import formatUrl from "../../utils/formatUrl";
import PasswordModal from "../modals/PasswordModal";
import { SearchIcon } from "lucide-react";

const ViewPasswords = () => {
  const [loading, setLoading] = useState(true);
  const [allPasswords, setAllPasswords] = useState(null);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalPassword, setModalPassword] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const loaderRows = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/password/all");
        if (res.status === 200) {
          setAllPasswords(res?.data?.data);
        }
      } catch (error) {
        setError("Error fetching Passwords");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [showPasswordModal]);

  const openPasswordModal = (e, password) => {
    e.preventDefault();
    setShowPasswordModal(true);
    setModalPassword(password);
  };

  const handleCopyClick = (event, value, isPasswordValue) => {
    event.preventDefault();
    event.stopPropagation();
    if (isPasswordValue) {
      navigator.clipboard.writeText(value.password).then(
        () => {
          successToast(
            `Password for ${value?.platformName} Copied to clipboard`
          );
        },
        (err) => {
          errorToast("Failed to copy to clipboard");
        }
      );
    } else {
      navigator.clipboard
        .writeText(value.username ? value.username : value.email)
        .then(
          () => {
            successToast(
              `${value.username ? "Username" : "Email"} for ${
                value?.platformName
              } copied to clipboard`
            );
          },
          (err) => {
            errorToast("Failed to copy to clipboard");
          }
        );
    }
  };

  const handleSearch = async () => {
    const enteredSearch = searchValue;
    if (!searchValue) {
      return;
    }
    setLoading(true);
    setSearchError(null);

    try {
      const res = await axios.get(`/api/v1/password/${searchValue}`);
      if (res.status === 200 && res?.data?.data?.length > 0) {
        setAllPasswords(res?.data?.data);
      } else if (res.status === 200 && res?.data?.data?.length === 0) {
        throw new Error("No Passwords Found");
      }
    } catch (e) {
      if (e.message === "No Passwords Found") {
        setSearchError("No Passwords Found");
      } else {
        setSearchError("Error searching Passwords");
      }
    } finally {
      setSearchValue(enteredSearch);
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setSearchValue(null);
    setSearchError(null);
    setError(null);
    try {
      const res = await axios.get("/api/v1/password/all");
      if (res.status === 200) {
        setAllPasswords(res?.data?.data);
      }
    } catch (error) {
      setError("Error fetching Passwords");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen flex flex-col items-center px-4">
        <div className="w-full flex justify-center form-control mb-4">
          <input className="input" placeholder="Search Platform" />
          <span className=" inline-flex items-center cursor-pointer">
            <SearchIcon />
          </span>
          <button
            className={`btn btn-error rounded-md ml-3 ${
              (loading || !searchValue) && "tab-disabled bg-gray-500 text-black"
            }`}
          >
            Reset
          </button>
        </div>
        <table className="table w-full max-w-4xl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Platform Name</th>
              <th>Platform Website</th>
              <th>Username/Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(loaderRows)].map((_, index) => (
              <tr key={index}>
                <th>
                  <div className="skeleton h-5 rounded-md"></div>
                </th>
                <td>
                  <div className="skeleton h-5 rounded-md"></div>
                </td>
                <td>
                  <div className="skeleton h-5 rounded-md"></div>
                </td>
                <td>
                  <div className="skeleton h-5 rounded-md"></div>
                </td>
                <td>
                  <div className="skeleton h-5 rounded-md"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">⚠️ {error}</div>;
  }

  return (
    <div className="w-screen flex flex-col items-center px-4">
      <div
        className={`flex flex-col items-center w-screen ${
          showPasswordModal ? "blur-lg tab-disabled" : ""
        }`}
      >
        <div className="w-full form-control justify-center px-4">
          <input
            className="input"
            placeholder="Search Platform"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => {
              e.key === "Enter" && handleSearch();
            }}
          />
          <span
            className={`inline-flex items-center cursor-pointer ${
              loading && "tab-disabled"
            }`}
            onClick={() => {
              handleSearch();
            }}
          >
            <SearchIcon />
          </span>
          <button
            className={`btn btn-error rounded-md ml-3 ${
              (loading || !searchValue) && "tab-disabled bg-gray-500 text-black"
            }`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        {searchError && <h3 className="text-red-500 mt-4">⚠️ {searchError}</h3>}
      </div>
      <div
        className={`overflow-x-auto w-full max-w-4xl ${
          showPasswordModal ? "blur-lg tab-disabled" : ""
        }`}
      >
        <table className="table-hover table w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">Platform Name</th>
              <th className="px-4 py-2">Platform Website</th>
              <th className="px-4 py-2">Username/Email</th>
              <th className="px-4 py-2">Password</th>
            </tr>
          </thead>
          <tbody>
            {allPasswords?.map((password, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  openPasswordModal(e, password);
                }}
                className="cursor-pointer"
              >
                <th className="px-4 py-2">{index + 1}</th>
                <td className="px-4 py-2">{password.platformName || "-"}</td>
                <td className="px-4 py-2">
                  <a
                    className={`${
                      password.platformUrl && "hover:underline text-blue-600"
                    }`}
                    href={
                      password.platformUrl && formatUrl(password.platformUrl)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {password.platformUrl || "-"}
                  </a>
                </td>
                <td className="px-4 py-2 relative group">
                  {password.username || password.email}
                  <span
                    className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleCopyClick(e, password, false)}
                  >
                    <FaCopy />
                  </span>
                </td>
                <td className="px-4 py-2 relative group">
                  {password.password}
                  <span
                    className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleCopyClick(e, password, true)}
                  >
                    <FaCopy />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPasswordModal && (
        <PasswordModal
          password={modalPassword}
          setShowPasswordModal={setShowPasswordModal}
        />
      )}
    </div>
  );
};

export default ViewPasswords;
