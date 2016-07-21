import express from 'express';
import controller from './expense.controller';

const router = express.Router({ mergeParams: true });

// POST => add an expense to a specific pool
router.post('/', controller.addExpense);

// GET => All expenses associated with the provided expense-pool
router.get('/', controller.getExpenses);

// ------------ Routes above have updated controllers ----------------


// POST => update a specific expense
router.post('/:expenseId', controller.editExpense);
// GET => specific expense
router.get('/:expenseId', controller.getOneExpense);

export default router;
