import axios from "axios";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { errorToast, successToast } from "../../utils/toastMessage";
import formatUrl from "../../utils/formatUrl";

const ViewPasswords = () => {
  const [loading, setLoading] = useState(true);
  const [allPasswords, setAllPasswords] = useState(null);
  const [error, setError] = useState(null);
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
  }, []);

  const handleCopyClick = (event, value, isPasswordValue) => {
    event.preventDefault();
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

  if (loading) {
    return (
      <div className="w-screen flex justify-center">
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
    <div>
      <div className="w-screen flex justify-center">
        <table className="table-hover w-full max-w-4xl table">
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
            {allPasswords?.map((password, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{password.platformName ? password.platformName : "-"}</td>
                <td>
                  <a
                    className="hover:underline"
                    href={formatUrl(password.platformUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {password.platformUrl ? password.platformUrl : "-"}
                  </a>
                </td>
                <td className="relative group">
                  {password.username ? password.username : password.email}
                  <span
                    className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleCopyClick(e, password, false)}
                  >
                    <FaCopy />
                  </span>
                </td>
                <td className="relative group">
                  {password?.password}
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
    </div>
  );
};

export default ViewPasswords;
