import express from 'express';
import controller from './user.controller';
const router = express.Router();
import { isAuthenticated } from '../../auth/auth.service';

// GET => all pools that a user is part of
router.get('/:id/expense-pools', isAuthenticated(), controller.getUserPools);

// ------------ Routes above have updated controllers ----------------

// GET => all user expenses for selected pool
router.get('/:id/expense-pools/:expPoolId/expenses',
            controller.getUserPoolExpenses);

// GET => all user expenses
router.get('/:id/users-expenses', controller.getUserExpenses);

// GET => info on one user
router.get('/:id', controller.getUser);

// POST => expense for user
router.post('/:id/users-expenses/:expenseId', controller.addUserExpense);

// POST => Add user
router.post('/:id', controller.addUser);

export default router;

