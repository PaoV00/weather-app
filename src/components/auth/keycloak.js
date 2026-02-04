import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://keycloak-server",
    realm: "Spring-boot-microservices-realm",
    clientId: "spring-cloud-client"
});

try {
    const authenticated = await keycloak.init();
    if (authenticated) {
        console.log('User is authenticated');
    } else {
        console.log('User is not authenticated');
    }
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}