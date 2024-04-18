import React, { useEffect, useState } from 'react';
import './App.css';
import Keycloak from 'keycloak-js';

function App() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

    const keycloakConfig = { // REPLACE with the clientID for the app1!!
        url: 'https://keycloak-dev.as.swisstxt.ch/auth',
        realm: 'test-realm',
        clientId: 'test-app'
    };

    const keycloak = new Keycloak(keycloakConfig);

    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
        if (authenticated) {
            setStatus("You're welcome");
        } else {
            setStatus("You shall not pass!");
        }
    });

  useEffect(() => {
    fetch('/healthcheck')
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(err => console.error("Geht nicht. Err:", err));
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <p>{message || "React app von app1"}</p>
          <p>{status || "No status message"}</p>
        </header>
      </div>
  );
}

export default App;
