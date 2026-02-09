import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useAuthState } from "./auth/authState";
import keycloak from "./auth/keycloak";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/slices/userSlice";

function MainNavigation() {
  const { isAuthenticated, tokenParsed } = useAuthState();
  const dispatch = useDispatch();

  const login = () => keycloak.login();
  const logout = () => {
    dispatch(clearUser);
    keycloak.logout({ redirectUri: window.location.origin })};

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
                <Nav.Link as={Link} to="/profile">
                  <strong>{tokenParsed?.preferred_username}</strong>
                </Nav.Link>
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
