import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar fixed="top" bg="primary" data-bs-theme="dark">
        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
        >
          <Navbar.Brand href="#">Password Manager</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
