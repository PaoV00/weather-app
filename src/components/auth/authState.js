import { useEffect, useState } from "react";
import keycloak from "./keycloak";

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    keycloak.authenticated
  );

  useEffect(() => {
    const onAuthChange = () => {
      setIsAuthenticated(keycloak.authenticated);
    };

    keycloak.onAuthSuccess = onAuthChange;
    keycloak.onAuthLogout = onAuthChange;
    keycloak.onTokenExpired = () => keycloak.updateToken(30);

    return () => {
      keycloak.onAuthSuccess = null;
      keycloak.onAuthLogout = null;
    };
  }, []);

  return {
    isAuthenticated,
    tokenParsed: keycloak.tokenParsed,
  };
}