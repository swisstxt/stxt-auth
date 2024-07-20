import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://keycloak-dev.as.swisstxt.ch',
    realm: 'test-realm',
    clientId: 'app1'
});

// try {
//     const authenticated = await keycloak.init();
//     console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
// } catch (error) {
//     console.error('Failed to initialize adapter:', error);
// }

export default keycloak;