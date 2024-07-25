# STXT AUTH

## Purpose

Identify which technologies we can use for the entry point of all our internal applications. In this example a user logs into one application once, and can then navigate to other applications without having to re-enter their credentials each time, provided they have the necessary access rights.

The underlying technology is called `Silent SSO`.
The iframe located in `%appname%/client/public/silent-check-sso.html` performs a silent Single Sign-On (SSO) check in Keycloak. It works by loading an invisible iframe with this HTML, which retrieves the current URL and posts it to the parent window using postMessage. The parent window receives the authentication status or tokens from the iframe without user interaction, ensuring a seamless and secure authentication check.

## Keycloak Instance

- **URL**: [Keycloak Instance](https://keycloak-dev.as.swisstxt.ch/)
- **Credentials**: Stored in 1Password
- **Realm**: All settings are created in `test-realm`

## How to run the application locally

### Dependencies
- Docker and docker-compose
- [caddy](https://caddyserver.com/docs/install)
- Node

### Allow cookies in your browser
1. Go to Chrome
2. Navigate to `Settings` -> `Privacy and security` -> `Cookies and other site data`
3. Select `Allow all cookies` or `Allow third-party cookies`

### Run the setup
2. Run caddy `caddy run`
3. Run the setup script `run npm setup`

###  Run the containers:
```
docker-compose up --build -d
```
### Access the entry point
- **URL**: https://login.stxt-auth.localhost
- **Default login**: Use one of the accounts set up in the `test-realm` in Keycloak
- **Login with your corporate account**: Click "AD Connection" under the login form and follow the typical login flow.


## Current issues on 01.07.2024 (delete it later)
- A user from Active Directory in the realm is not visible until they log in for the first time. This means that it's impossible to assign the user to a specific group in advance. Initially, they see that access is denied, and only after they attempt to log in once can they be granted access to a specific group. In theory, a custom script could be written to import users using the Azure AD API and Keycloak Admin API, but I haven't explored this topic in detail.# keycloak-with-socket-factory
