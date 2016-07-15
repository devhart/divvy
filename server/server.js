// Require for use with ES6
import 'babel-polyfill';

import express from 'express';  

const app = express();

app.get( '/', (req, res) => res.send('Hello World!') );

app.listen( 3000, () => console.log('Example app listening on port 3000!') );
