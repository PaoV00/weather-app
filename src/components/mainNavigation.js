import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { userAuth } from "./auth/userAuth";


function MainNavigation() {
  const { isAuthenticated, login, logout, tokenParsed } = userAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Weather App" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
          </Nav>
          <Nav>
            {!isAuthenticated && <Nav.Link onClick={login}>Login</Nav.Link>}

            {isAuthenticated && (
              <>
                <Navbar.Text className="me-3">
                  <strong>{tokenParsed?.preferred_username}</strong>
                </Navbar.Text>

                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
