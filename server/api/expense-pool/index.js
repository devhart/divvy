/**
 * POST  /api/expense-pools/          -> create
 * GET   /api/expense-pools/:id       -> get
 * PUT   /api/expense-pools/:id       -> update
 * PATCH /api/expense-pools/:id       -> update
 * POST  /api/expense-pools/:id/users -> add user
 * GET   /api/expense-pools/:id/users -> list users
 */

import express from 'express';
import controller from './expense-pool.controller';
import expenseRouter from './expense';

import { isPoolMember } from './expense-pool.auth';

const router = express.Router();

/**
 * Create an expense and add req.user as a member
 *
 * req.body expected to be key-value pairs of attributes the pool
 * will be created with.
 */
router.post('/', controller.create);

/**
 * Get details of specific expense pool
 */
router.get('/:id', isPoolMember(), controller.get);

/**
 * Update an expense pool's attributes
 *
 * req.body expected to be key-value pairs of attributes to update.
 */
router.put('/:id', isPoolMember(), controller.update);
router.patch('/:id', isPoolMember(), controller.update);

/**
 * Add a user to an expense pool by user id
 *
 * req.body expected to be { userId: <some user's _id> }.
 */
router.post('/:id/users', isPoolMember(), controller.addUser);

/**
 * Get users that are members of an expense pool
 */
router.get('/:id/users', isPoolMember(), controller.listUsers);

router.use('/:id/expenses', isPoolMember(), expenseRouter);

export default router;
