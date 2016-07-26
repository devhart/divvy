// Require for use with ES6
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  /* eslint-disable global-require */
  require('babel-polyfill');
  /* eslint-enable global-require */
}

import configExpress from './config/express';
import configRoutes from './routes';
import express from 'express';
import db from './db';

const app = express();
const log = message => {
  /* eslint-disable no-console */
  console.log(message);
  /* eslint-enable no-console */
};

configExpress(app);
configRoutes(app);

db.sync()
  .then(() => {
    app.listen(app.get('port'), app.get('ip'), () => {
      log(`Listening on port ${app.get('port')} in ${app.get('env')} mode...`);
    });
  })
  .catch(err => log(`Server failed to start: ${err}`));
