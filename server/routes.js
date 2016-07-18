import authRouter from './auth';
import userRouter from './api/user';

export default app => {
  app.use('/api/users', userRouter);

  app.use('/auth', authRouter);
};
