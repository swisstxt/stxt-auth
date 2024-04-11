import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const app: express.Application = express();

// Session configuration
let memoryStore = new session.MemoryStore();
app.use(session({
    secret: process.env.SESSION_SECRET || 'thisShouldBeLongAndSecure',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Keycloak configuration
let keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));

// Public route
app.get('/', (req, res) => {
    res.send('Public area. No authentication required.');
});

// Secured route
app.get('/secure', keycloak.protect(), (req, res) => {
    res.send('Secure area. Authentication via Keycloak succeeded.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
