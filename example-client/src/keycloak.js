import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_ID
});

// try {
//     const authenticated = await keycloak.init();
//     console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
// } catch (error) {
//     console.error('Failed to initialize adapter:', error);
// }

export default keycloak;