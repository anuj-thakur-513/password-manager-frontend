import { Edit2Icon } from "lucide-react";
import { MdClose, MdDelete } from "react-icons/md";

const PasswordModal = ({ password, setShowPasswordModal }) => {
  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    } else if (words.length === 1) {
      return words[0][0];
    }
    return "";
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
                className="p-2 border rounded-md tab-disabled"
                value={password.username || password.email}
                readOnly
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="p-2 border rounded-md tab-disabled"
              value={password.password}
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => {}}
            className="bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 flex items-center space-x-2"
          >
            <MdDelete className="w-4 h-4" />
            <span>Delete</span>
          </button>
          <button
            onClick={() => {}}
            className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Edit2Icon className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
