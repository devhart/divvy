import authRouter from './auth';
import userRouter from './api/user';
import expensePoolRouter from './api/expense-pool';
import { isAuthenticated } from './auth/auth.service';

export default app => {
  app.use('/api/users', isAuthenticated(), userRouter);
  app.use('/api/expense-pools', isAuthenticated(), expensePoolRouter);
  app.use('/auth', authRouter);

  /**
   * Sends 404 Not Found response for requests with urls that start with a defined
   * api endpoint prefix or a static file directory name but are not handled.
   *
   * TODO: Send a styled 404 html file.
   */
  app.route('/:url(api|auth|app|bower_components|assets)/*').get((req, res) => {
    res.sendStatus(404);
  });

  /**
   * Assume all other requests are for indicating application state. Send index.html and let
   * client update the state based on the url.
   */
  app.route('/*').get((req, res) => res.sendfile(`${app.get('clientPath')}/index.html`));
};
