import authRouter from './auth';
import userRouter from './api/user';
import expensePoolRouter from './api/expense-pool';

export default app => {
  app.use('/api/users', userRouter);
  app.use('/api/expense-pools', expensePoolRouter);
  app.use('/auth', authRouter);
};
