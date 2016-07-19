import express from 'express';
import controller from './expense.controller';
// import itemRouter from express.Router({ mergeParams: true });

const router = express.Router();

// POST => add an expense to a specific pool
router.post('/', controller.addExpense);
// GET => All expenses
router.get('/', controller.getExpenses);

// POST => update a specific expense
router.post('/:expenseId', controller.editExpense);
// GET => specific expense
router.get('/:expenseId', controller.getOneExpense);

export default router;
