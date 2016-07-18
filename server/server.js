// Require for use with ES6
import 'babel-polyfill';

import configExpress from './config/express-config';
import configRoutes from './routes';
import express from 'express';
import db from './database/database';

const app = express();
const port = 3000;

configExpress(app);
configRoutes(app);

app.get('/', (req, res) => res.send('Hello World!'));

db.sync().then(() => {
  app.listen(port, () => console.log('Example app listening on port 3000!'));
  // const server = app.listen(app.get('port'), function() {
  //   debug('Express server listening on port ' + server.address().port);
  // });
});
