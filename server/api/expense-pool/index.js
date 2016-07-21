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

// ------------ Routes above have updated controllers ----------------

// GET => show all pools
// Added for testing only
router.get('/test', isPoolMember(), controller.getPools);

// Express router captures implied filepath
// '/:id' below is '/api/expense-pools/:id'

// POST => update a specific pool
router.post('/:id', isPoolMember(), controller.updatePool);

router.use('/:id/expenses', isPoolMember(), expenseRouter);

export default router;
