import express from 'express';
import controller from './expense.controller';

const router = express.Router();

// POST => add an expense to a specific pool
router.post('/', controller.addExpense);
// GET => All expenses
router.get('/', controller.getExpenses);

// POST => update a specific expense
router.post('/:id', controller.addExpense);
// GET => specific expense
router.get('/:id', controller.getExpenses);

export default router;
