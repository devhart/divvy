import express from 'express';
import controller from './expense.controller';

const router = express.Router({ mergeParams: true });

// POST => add an expense to a specific pool
router.post('/', controller.addExpense);

// GET => All expenses associated with the provided expense-pool
router.get('/', controller.getExpenses);

// POST => update a specific expense
router.put('/:expenseId', controller.editExpense);
router.patch('/:expenseId', controller.editExpense);

// ------------ Routes above have updated controllers ----------------

// GET => specific expense
router.get('/:expenseId', controller.getOneExpense);

export default router;
