// Require for use with ES6
import 'babel-polyfill';

import configExpress from './config/express';
import configRoutes from './routes';
import express from 'express';
import db from './database/database';

const app = express();

configExpress(app);
configRoutes(app);

db.sync()
  .then(() => {
    app.listen(app.get('port'), app.get('ip'), () => {
      console.log(`Listening on port ${app.get('port')} in ${app.get('env')} mode...`);
    });
  })
  .catch(err => console.log('Server failed to start:', err));
