import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';

import config from './environment';

export default app => {
  app.set('port', config.port);
  app.set('ip', config.ip);
  app.set('clientPath', `${config.root}/client`);

  app.use(morgan('dev'));
  app.use(express.static(app.get('clientPath')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
};
