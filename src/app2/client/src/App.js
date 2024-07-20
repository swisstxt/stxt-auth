import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import './App.css';

const App = ({ app }) => {
    const { keycloak, initialized } = useKeycloak();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (initialized) {
            if (!keycloak.authenticated) {
                keycloak.login();
            } else {
                const { groups, azp } = keycloak.tokenParsed;
                const authorized = groups.some(group => group.includes(azp));
                setIsAuthorized(authorized);

                const apps = groups.map(group => {
                    const appName = group.replace('/', '').split('-')[0];
                    return { name: appName, url: `https://${appName}.stxt-auth.localhost/` };
                });
                setLinks(apps);
            }
        }
    }, [keycloak, initialized]);

    if (!initialized) {
        return <div>Initializing Keycloak...</div>;
    }

    if (!keycloak.authenticated) {
        return <div>Redirecting to login...</div>;
    }

    console.log("keycloak.tokenParsed ", keycloak.tokenParsed);

    return (
        <div className="app">
            <nav className="app__nav">
                <div className="app__nav-links">
                    {links
                        .filter(link => link.name !== keycloak.tokenParsed.azp)
                        .map((link, index) => (
                            <a key={index} href={link.url} className="app__nav-link">{link.name}</a>
                        ))}
                </div>
                <button
                    type="button"
                    onClick={() => keycloak[keycloak.authenticated ? 'logout' : 'login']()}
                    className="app__button"
                >
                    {keycloak.authenticated ? 'Logout' : 'Login'}
                </button>
            </nav>
            <div className="app__content">
                {isAuthorized ? (
                    <h1 className="app__welcome">Welcome to {app}</h1>
                ) : (
                    <img className="app__image" src={`${process.env.PUBLIC_URL}/you_shall_not_pass.jpg`}
                         alt="You shall not pass!"/>
                )}
            </div>
            <div className="app__user-info">
                <p className="app__user-name">You are logged in
                    as {keycloak.tokenParsed.name} ({keycloak.tokenParsed.preferred_username})</p>
                <p className="app__user-access">You have access to the following applications:</p>
                <ul className="app__app-list">
                    {links.map((link, index) => (
                        <li key={index} className="app__app-list-item">
                            <a href={link.url}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;