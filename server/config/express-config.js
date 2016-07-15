import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// TO DO: passport

// TO DO: sequelize connection

export default app => {
  app.use(morgan('dev'));

  // TO DO: app.use(express.static(app.get('clientPath')));

  app.use(bodyParser.json())

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

  // TO DO: express-session

}
