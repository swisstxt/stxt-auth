import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import keycloak from './keycloak';
import App from './App';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' }}
    >
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </Router>
    </ReactKeycloakProvider>
);