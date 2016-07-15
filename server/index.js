'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  require('babel-register');
}

module.exports = require('./server');
