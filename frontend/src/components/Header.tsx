import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Link to="/" className="navbar-brand">
        MERN
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Link to="/login" className="nav-link">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/register" className="nav-link">
            <FaUser /> Register
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
