import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../context/session";

const Header = () => {
  const { isLoggedIn, logout } = useSession();
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          MERN
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <Button
                variant="link"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <FaSignOutAlt /> Logout
              </Button>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  <FaSignInAlt /> Login
                </Link>
                <Link to="/register" className="nav-link">
                  <FaUser /> Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
