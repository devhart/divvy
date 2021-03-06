import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';

import config from './environment';

export default app => {
  app.set('port', config.port);
  app.set('ip', config.ip);
  app.set('clientPath', `${config.root}/client`);
  app.use(express.static(app.get('clientPath')));
  app.use(morgan('dev'));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  if (app.get('env') === 'development' || app.get('env') === 'test') {
    /* eslint-disable global-require */
    app.use(require('errorhandler')());
    /* eslint-enable global-require */
  }
};
