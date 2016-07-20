import express from 'express';
import controller from './expense-pool.controller';
import expenseRouter from './expense';

const router = express.Router();

router.use('/:id/expenses', expenseRouter);

// POST => add a new pool
router.post('/', controller.addPool);

// POST => Add user to pool
router.post('/:id/users/:userId', controller.addUserToPool);

// Express router captures implied filepath
// '/:id' below is '/api/expense-pools/:id'

// GET => get a specific pool
router.get('/:id', controller.getPool);
// POST => update a specific pool
router.post('/:id', controller.updatePool);

export default router;
