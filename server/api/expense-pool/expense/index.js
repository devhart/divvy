/**
 * POST  /api/expense-pools/:id/expenses            -> create
 * GET   /api/expense-pools/:id/expenses            -> all expenses for a pool
 * GET   /api/expense-pools/:id/expenses/:expenseId -> get
 * PUT   /api/expense-pools/:id/expenses/:expenseId -> update
 * PATCH /api/expense-pools/:id/expenses/:expenseId -> update
 */

import express from 'express';
import controller from './expense.controller';

import { isPoolExpense, isExpenseUser } from './expense.auth';

const router = express.Router();

router.post('/', controller.create);

router.get('/', controller.all);

router.get('/:expenseId', isPoolExpense(), controller.get);

router.put('/:expenseId', isExpenseUser(), controller.update);
router.patch('/:expenseId', isExpenseUser(), controller.update);

export default router;
