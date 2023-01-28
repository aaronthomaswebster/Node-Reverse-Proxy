# Node-Reverse-Proxy


## What is Node-Reverse-Proxy?

Node-Reverse-Proxy is a simple reverse proxy server that can be used to proxy requests to a docker containsers running on the same server. It is written in Node.js and uses Express.js as the web framework.


## Development Status

This project is currently in development and is not ready for production use but can be used for testing purposes.


## Example Usage

1. Install Node.js and NPM
2. Clone this repository
3. Run `npm install` to install the dependencies
4. Update the routes defined in index.js to match your needs
5. Update paths to SSL certificates and keys in index.js
6. If you are using multiple SSL certificates, add them.
7. Make sure the docker containers you want to proxy to are running
8. Ensure that the server you are running on is exposed to the internet
9. Point your dns records to the servers public ip address
10. Run `npm start` to start the server
11. Visit the URL defined in the routes in your browser

### TODO


* Add support for a 404 page
