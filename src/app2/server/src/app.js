import * as dotenv from 'dotenv';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
dotenv.config();
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
    res.sendStatus(204);
});

// Initial healthcheck
app.get('/healthcheck', (req, res) => {
    res.json({ message: "Backend von app2 läuft" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
