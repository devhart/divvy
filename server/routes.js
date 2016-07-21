import authRouter from './auth';
import userRouter from './api/user';
import expensePoolRouter from './api/expense-pool';
import { isAuthenticated } from './auth/auth.service';

/**
 * isAuthenticated returns a middleware function
 * This function finds or creates a user based on provided token
 * Sends a 401 status code if token is invalid
 * See the addPool function on expense-pool.controller for example in use
 */

export default app => {
  app.use('/api/users', isAuthenticated(), userRouter);
  app.use('/api/expense-pools', isAuthenticated(), expensePoolRouter);
  app.use('/auth', authRouter);
};
