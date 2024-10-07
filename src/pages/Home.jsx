import { useState } from "react";
import AddPassword from "../components/password/AddPassword";
import ViewPasswords from "../components/password/ViewPasswords";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("add-password");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10 h-screen">
        <div className="tabs tabs-boxed gap-1">
          <input
            type="radio"
            id="tab-13"
            name="tab-5"
            className="tab-toggle"
            checked={selectedTab === "add-password"}
            onChange={() => handleTabChange("add-password")}
          />
          <label htmlFor="tab-13" className="tab">
            Add Password
          </label>

          <input
            type="radio"
            id="tab-14"
            name="tab-5"
            className="tab-toggle"
            checked={selectedTab === "view-passwords"}
            onChange={() => handleTabChange("view-passwords")}
          />
          <label htmlFor="tab-14" className="tab">
            View Passwords
          </label>
        </div>
        <div className="mt-6">
          {selectedTab === "add-password" && <AddPassword />}
          {selectedTab === "view-passwords" && <ViewPasswords />}
        </div>
      </div>
    </>
  );
};

export default Home;
