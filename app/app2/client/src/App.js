import React, {useEffect, useState} from 'react';
import { useKeycloak } from '@react-keycloak/web';

const App = () => {
    const { keycloak, initialized } = useKeycloak();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        console.log('Keycloak initialized:', initialized);
        if (initialized) {
            if (!keycloak.authenticated) {
                console.log('User is not authenticated, redirecting to login...');
                keycloak.login();
            } else {
                console.log('User is authenticated');
                const { groups, azp } = keycloak.tokenParsed;

                const authorized = groups.some(group => group.includes(azp));
                setIsAuthorized(authorized);
            }
        }
    }, [keycloak, initialized]);

    if (!initialized) {
        return <div>Initializing Keycloak...</div>;
    }

    if (!keycloak.authenticated) {
        return <div>Redirecting to login...</div>;
    }

    console.log("keycloak.tokenParsed ", keycloak.tokenParsed.groups);

    return (
        <div>
            <div>
                {isAuthorized ? (
                    <>
                        <h1>Welcome to App2</h1>
                        <p>You are logged in as {keycloak.tokenParsed.preferred_username}</p>
                    </>
                ) : (
                    <img src={`${process.env.PUBLIC_URL}/you_shall_not_pass.jpg`} alt="You shall not pass!"/>
                )}
            </div>
            <p>You have access to the following groups: {JSON.stringify(keycloak.tokenParsed.groups)}</p>
            {!keycloak.authenticated && (
                <button
                    type="button"
                    className="text-blue-800"
                    onClick={() => keycloak.login()}
                >
                    Login
                </button>
            )}

            {!!keycloak.authenticated && (
                <button
                    type="button"
                    className="text-blue-800"
                    onClick={() => keycloak.logout()}
                >
                    Logout ({keycloak.tokenParsed.preferred_username})
                </button>
            )}
        </div>
    );
};

export default App;