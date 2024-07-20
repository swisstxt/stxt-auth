import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://keycloak-dev.as.swisstxt.ch',
    realm: 'test-realm',
    clientId: 'app2'
});

export default keycloak;