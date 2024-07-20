import { Navbar, Container } from "react-bootstrap";
import axios from "axios";
import UserAuthContext from "../context/UserAuthContext";
import { useContext } from "react";

const Header = () => {
  const userAuth = useContext(UserAuthContext);
  const handleLogout = async () => {
    const res = await axios.get("/api/v1/user/logout");
    userAuth.setIsAuthenticated(false);
  };

  return (
    <>
      <Navbar fixed="top" bg="primary" data-bs-theme="dark">
        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
        >
          <Navbar.Brand href="#">Password Manager</Navbar.Brand>
        </Container>
        <button className="btn btn-danger me-2" onClick={handleLogout}>
          Logout
        </button>
      </Navbar>
    </>
  );
};

export default Header;
