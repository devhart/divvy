// Require for use with ES6
import 'babel-polyfill';

import configExpress from './config/express-config';
import express from 'express';

const app = express();

configExpress(app);

app.get( '/', (req, res) => res.send('Hello World!') );

app.listen( 3000, () => console.log('Example app listening on port 3000!') );
