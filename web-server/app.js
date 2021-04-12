const express = require('express');
const path = require('path');
const APP = express();


const SERVER_PORT = 8080;
const SERVER_IP = '0.0.0.0';
const SERVER_FOLDER = '../www';
const SERVER_FOLDER_SRC = '../src';
const SERVER_FOLDER_DOCS = '../docs';

// set the port
APP.set('port', SERVER_PORT);

// tell express that we want to use the www folder
APP.use('/', express.static(path.join(__dirname, SERVER_FOLDER)));
// we need to use src folder to include our js files
APP.use('/src', express.static(path.join(__dirname, SERVER_FOLDER_SRC)));
// we need to use docs folder to include our jsdoc documentation
APP.use('/', express.static(path.join(__dirname, SERVER_FOLDER_DOCS)));

// Listen for requests
// eslint-disable-next-line no-unused-vars
const SERVER = APP.listen(APP.get('port'), SERVER_IP, function() {
  console.log('The server is running on http://<your machine IP addr>:' +
      APP.get('port'));
});
