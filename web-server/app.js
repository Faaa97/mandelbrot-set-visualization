const express = require('express');
const path = require('path');
const APP = express();


const SERVER_PORT = 8080;
const SERVER_IP = '0.0.0.0';
const SERVER_FOLDER = '../dist';
const SERVER_FOLDER_DOCS = '../docs';

// set the port
APP.set('port', SERVER_PORT);

// tell express that we want to use the www folder
APP.use('/', express.static(path.join(__dirname, SERVER_FOLDER)));
// we need to use docs folder to include our jsdoc documentation
APP.use('/', express.static(path.join(__dirname, SERVER_FOLDER_DOCS)));

// Listen for requests
// eslint-disable-next-line no-unused-vars
const SERVER = APP.listen(APP.get('port'), SERVER_IP, function() {
  console.log('The server is running on http://<your machine IP addr>:' +
      APP.get('port'));
});
