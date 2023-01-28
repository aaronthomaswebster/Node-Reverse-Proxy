var http = require('http');
const express = require('express');
const https = require('https');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();


// List of hosts and the port that their doker container is running on
const routes = {
    'my-domain.com': 3000,
    'api.my-domain.com': 3001,
    'admin.my-domain.com': 3002,
    'my-other-domain.com': 3003,
}




// First Certificate
const privateKey1 = fs.readFileSync('pathToCertificate/privkey.pem', 'utf8');
const certificate1 = fs.readFileSync('pathToCertificate/cert.pem', 'utf8');
const ca1 = fs.readFileSync('pathToCertificate/chain.pem', 'utf8');
const credentials1 = {
    key: privateKey1,
    cert: certificate1,
    ca: ca1
};

 

// redirect all requests to http to the appropriate host
app.use('**', function(req, res, next) {
  let target;
  let host = req.get('host')
  console.log('host: ', host)
  if(routes[host] != null){
      console.log('routes[host]: ', routes[host])
      target = `http://localhost:${routes[host]}`
  }
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
  })(req, res, next);
});


let httpsServer = https.createServer(credentials1, app).listen(443, () => {
    console.log('Reverse proxy server running on port 443');
});


/*
* To add additional hosts, add the following code below
* and change the host name and path to the certificate files
* you can do this as many times as you need to add additional hosts
*/
// const privateKey2 = fs.readFileSync('pathToCertificate/privkey.pem', 'utf8');
// const certificate2 = fs.readFileSync('pathToCertificatem/cert.pem', 'utf8');
// const ca2 = fs.readFileSync('pathToCertificate/chain.pem', 'utf8');
// const additionalCredentials = {
//     key: privateKey2,
//     cert: certificate2,
//     ca: ca2
// };

// httpsServer.addContext('secodary host name', additionalCredentials);



// Redirect from http port 80 to https
http.createServer(function (req, res) {
    console.log('redirecting to: ', "https://" + req.headers['host'] + req.url)
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);


