import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://keycloak-dev.as.swisstxt.ch/auth',
    realm: 'test-realm',
    clientId: 'login'
});

export default keycloak;