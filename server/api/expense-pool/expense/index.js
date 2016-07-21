import express from 'express';
import controller from './expense.controller';

const router = express.Router({ mergeParams: true });

// POST => Add an expense to a specific pool
router.post('/', controller.addExpense);

// GET => All expenses associated with the provided expense-pool
router.get('/', controller.getExpenses);

/**
 * PUT / PATCH => Edit single record
 * Request body should be key-value pairs of attributes to update
 * Returns a 204 status on success
 */
router.put('/:expenseId', controller.editExpense);
router.patch('/:expenseId', controller.editExpense);

// GET => Specific expense
router.get('/:expenseId', controller.getOneExpense);

export default router;
