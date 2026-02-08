import keycloak from "./keycloak";

export function userAuth() {
  return {
    isAuthenticated: keycloak.authenticated,
    login: () => keycloak.login(),
    logout: () =>
      keycloak.logout({
        redirectUri: window.location.origin,
      }),
    tokenParsed: keycloak.tokenParsed,
  };
}