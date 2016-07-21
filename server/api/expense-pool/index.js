import express from 'express';
import controller from './expense-pool.controller';
import expenseRouter from './expense';

import { isPoolMember } from './expense-pool.auth';

const router = express.Router();

// POST => add a new pool
router.post('/', controller.addPool);

// GET => get a specific pool
router.get('/:id', isPoolMember(), controller.getPool);

/**
 * POST => Add user to pool
 * Expect body to contain ID of user to add
 */
router.post('/:id/users', isPoolMember(), controller.addUserToPool);

router.put('/:id', isPoolMember(), controller.updatePool);
router.patch('/:id', isPoolMember(), controller.updatePool);

router.use('/:id/expenses', isPoolMember(), expenseRouter);

export default router;
