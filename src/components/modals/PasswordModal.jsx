import { useState } from "react";
import { Edit2Icon, SaveIcon } from "lucide-react";
import { MdClose, MdDelete } from "react-icons/md";
import axios from "axios";

import { EMAIL_REGEX } from "../../constants";
import { errorToast, successToast } from "../../utils/toastMessage";

const PasswordModal = ({ password, setShowPasswordModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(password.username || password.email);
  const [userPassword, setUserPassword] = useState(password.password);

  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    } else if (words.length === 1) {
      return words[0][0];
    }
    return "";
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setLoading(true);

    if (
      !username ||
      !userPassword ||
      ((username === password.username || username === password.email) &&
        userPassword === password.password)
    ) {
      setError("Enter Username/Email & Password to update");
      setLoading(false);
      return;
    }

    const isEmail = EMAIL_REGEX.test(username);

    try {
      const res = await axios.patch("/api/v1/password/update", {
        platformName: password.platformName,
        ...(password.platformUrl && { platformUrl: password.platformUrl }),
        ...(isEmail ? { email: username } : { username: username }),
        password: userPassword,
      });

      if (res.status === 200) {
        successToast("Password updated successfully");
        setIsEditing(false);
        setShowPasswordModal(false);
      }
    } catch (e) {
      setError("Failed to update password, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isEditing) {
      setIsEditing(false);
      return;
    }
    setLoading(true);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this password? This cannot be undone."
    );
    if (!confirmDelete) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.delete(`/api/v1/password/delete/${password._id}`);
      if (res.status === 200) {
        errorToast("Password deleted successfully");
        setIsEditing(false);
        setShowPasswordModal(false);
      }
    } catch (e) {
      setError("Failed to delete password, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center">
      <div className="modal-content rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-xl font-bold rounded-full">
              {password.platformName
                ? getInitials(password?.platformName).toUpperCase()
                : getInitials(password?.platformUrl).toUpperCase()}
            </div>
            <h2 className="text-lg font-semibold capitalize">
              {password.platformName || password.platformUrl}
            </h2>
          </div>
          <button onClick={() => setShowPasswordModal(false)}>
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {(password.username || password.email) && (
            <div className="flex flex-col">
              <label htmlFor="username">Username/Email</label>
              <input
                id="username"
                className={`p-2 border rounded-md ${
                  !isEditing && "tab-disabled"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!isEditing}
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className={`p-2 border rounded-md ${
                !isEditing && "tab-disabled"
              }`}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {error && (
          <div className="mt-2">
            <h3 className="text-red-500">⚠️ {error}</h3>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleDelete}
            className={`bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 flex items-center space-x-2 ${
              loading && "tab-disabled text-black bg-gray-500"
            }`}
          >
            {!isEditing ? (
              <>
                <MdDelete className="w-4 h-4" />
                <span>Delete</span>
              </>
            ) : (
              <>
                <MdClose className="w-4 h-4" />
                <span>Cancel</span>
              </>
            )}
          </button>
          <button
            onClick={handleEdit}
            className={`bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 flex items-center space-x-2 ${
              loading && "tab-disabled text-black bg-gray-500"
            }`}
          >
            {!isEditing ? (
              <>
                <Edit2Icon className="w-4 h-4" />
                <span>Edit</span>
              </>
            ) : (
              <>
                <SaveIcon className="w-4 h-4" />
                <span>Update</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
