import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./pages/home";
import SearchLocation from "./pages/search";
import Profile from "./pages/profile";
import keycloak from "./components/auth/keycloak";
import { apiFetch } from "./components/auth/apiFetch";
import { useAuthState } from "./components/auth/authState";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./store/slices/userSlice";
import { useSelector } from "react-redux";


function App() {
  const { isAuthenticated } = useAuthState();
  const dispatch = useDispatch();
  const isUserLoaded = useSelector((state) => state.user.isLoaded);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearUser());
      return;
    }
    console.log(`
      Return from keycloak:
      keycloakId: ${keycloak.tokenParsed.sub}
      username: ${keycloak.tokenParsed.preferred_username}
      email: ${keycloak.tokenParsed.email}
      firstname: ${keycloak.tokenParsed.given_name}
      lastname: ${keycloak.tokenParsed.family_name}
    `);

    if (keycloak.tokenParsed) {
      apiFetch("/api/user/sync", {
        method: "POST",
        body: JSON.stringify({
          keycloakId: keycloak.tokenParsed.sub,
          email: keycloak.tokenParsed.email,
          username: keycloak.tokenParsed.preferred_username,
          firstName: keycloak.tokenParsed.given_name,
          lastName: keycloak.tokenParsed.family_name,
        }),
      })
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  if (!isUserLoaded) {
    return <p>Bootstrapping user…</p>;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchLocation />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
