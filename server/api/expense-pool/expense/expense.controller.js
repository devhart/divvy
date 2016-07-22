import { Expense, ExpensePool } from '../../../db';
import { handleError } from '../../../utils';

const controller = {};

controller.create = (req, res) => {
  Expense.create(req.body)
    .then(expense => expense.setUser(req.user)
      .then(() => req.expensePool.addExpense(expense))
      .then(() => res.json(expense)))
    .catch(handleError(res));
};

controller.all = (req, res) => {
  res.json(req.expensePool.getExpenses());
};

controller.get = (req, res) => {
  Expense.findById(req.params.expenseId)
    .then(expense => res.json(expense))
    .catch(handleError(res));
};

controller.update = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  Expense.findById(req.params.expenseId)
    .then(expense => expense.updateAttributes(req.body))
    .then(updated => res.json(updated))
    .catch(handleError(res));
};

export default controller;
