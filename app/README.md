# Authentication Application Proof of Concept

## Purpose

Identify which technologies we can use for the entry point of all our internal applications.

## Keycloak Instance

- **URL**: [Keycloak Instance](https://keycloak-dev.as.swisstxt.ch/)
- **Credentials**: Stored in 1Password
- **Realm**: All settings are created in `test-realm`

## How to run the application locally

### Create the Network

```sh
docker network create proxy
```
### Allow cookies in your browser
1. Go to Chrome
2. Navigate to `Settings` -> `Privacy and security` -> `Cookies and other site data`
3. Select `Allow all cookies` or `Allow third-party cookies`

### Update your hosts file
1. Open the hosts file located at `C:\Windows\System32\drivers\etc\hosts`
2. Add the following lines:
```
127.0.0.1 app1.local
127.0.0.1 app2.local
127.0.0.1 login.local
127.0.0.1 api.app1.local
127.0.0.1 api.app2.local
127.0.0.1 api.login.local
```
###  Run the containers:
```
docker-compose up --build -d
```
### Access the entry point
- **URL**: http://login.local
- **Login**: Use one of the accounts set up in the `test-realm` in Keycloak

## Additional information
- Make sure you have Docker and Docker Compose installed on your machine.
- Ensure that the `proxy` network is created only once; subsequent runs of the application do not require recreating the network.
- If you encounter issues with cookies, double-check the browser settings and make sure third-party cookies are allowed.

## Current issues on 18.06.2024 (delete it later)
The package `shared` has to be linked to the `app1/client` and `app1/client` and imported to `index.js` in both applications.
Using `npm link` via command line doesn't help because this must be implemented in the docker setup.