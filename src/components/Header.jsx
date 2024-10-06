import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const getUserInitials = (name) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    } else if (words.length === 1) {
      return words[0][0];
    }
    return "";
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout");
      if (res.status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="navbar navbar-glass">
      <div className="navbar-start">
        <a className="navbar-item" onClick={() => {}}>
          Password Manager
        </a>
      </div>
      {user && (
        <div className="navbar-end">
          <div className="avatar avatar-md avatar-ring-secondary">
            <div className="dropdown-container">
              <div className="dropdown">
                <label
                  className="btn btn-ghost flex cursor-pointer px-0"
                  tabIndex="0"
                >
                  {user?.name ? (
                    <div>{getUserInitials(user.name).toUpperCase()}</div>
                  ) : (
                    <img
                      src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
                      alt="avatar"
                    />
                  )}
                </label>
                <div className="dropdown-menu dropdown-menu-bottom-left">
                  <a className="dropdown-item text-sm">Profile</a>
                  <a
                    tabIndex="-1"
                    className="dropdown-item text-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
