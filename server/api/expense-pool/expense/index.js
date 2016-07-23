/**
 * POST  /api/expense-pools/:id/expenses            -> create
 * GET   /api/expense-pools/:id/expenses            -> all expenses for a pool
 * GET   /api/expense-pools/:id/expenses/:expenseId -> get
 * PUT   /api/expense-pools/:id/expenses/:expenseId -> update
 * PATCH /api/expense-pools/:id/expenses/:expenseId -> update
 */

import express from 'express';
import controller from './expense.controller';

const router = express.Router();

router.post('/', controller.create);

router.get('/', controller.all);

router.get('/:expenseId', controller.get);

router.put('/:expenseId', controller.update);
router.patch('/:expenseId', controller.update);

export default router;
