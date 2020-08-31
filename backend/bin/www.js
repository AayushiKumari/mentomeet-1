#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../app');
import app from './../server/index.js'
// var debug = require('debug')('confusionserver:server');
import debug from 'debug'
// var http = require('http');
// var https = require('https');
// var fs = require('fs');
import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || 5005);
app.set('port', port);
app.set('secPort', port+440);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

const __dirname = path.resolve() 

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var options = {
  key : fs.readFileSync(__dirname + '/bin/private.key'),
  cert : fs.readFileSync(__dirname + '/bin/certificate.pem')
}

var secureServer = https.createServer(options, app);

secureServer.listen(app.get('secPort'), ()=>{
  console.log("\nSECURE Server Listening on port: " + app.get('secPort') + "\n");
})

secureServer.on('error', onError);
secureServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}