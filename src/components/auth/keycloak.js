import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://keycloak:8080",
  realm: "spring-boot-microservices-realm",
  clientId: "frontend",
});

window.keycloak = keycloak;

export default keycloak;
