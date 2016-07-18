// Require for use with ES6
import 'babel-polyfill';

import configExpress from './config/express-config';
import configRoutes from './routes';
import express from 'express';

const app = express();

configExpress(app);
configRoutes(app);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => {
  /* eslint-disable no-console */
  console.log('Example app listening on port 3000!');
  /* eslint-enable no-console */
});
