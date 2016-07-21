import { Expense, ExpensePool } from '../../../db';
import { handleError } from '../../../utils';

const controller = {};

controller.addExpense = (req, res) => {
  ExpensePool.findById(req.params.id)
    .then(expensePool => {
      // Closure provides setExpense pool with access to expensePool
      return Expense.create(req.body)
        .then(expense => expense.setExpensePool(expensePool))
        .then(expense => res.send(expense.get({ plain: true })));
    })
    .catch(handleError(res));
};

controller.editExpense = (req, res) => {
  Expense.findById(req.params.expenseId)
    .then(expense => expense.updateAttributes(req.body))
    .then(() => res.sendStatus(204))
    .catch(handleError(res));
};

controller.getExpenses = (req, res) => {
  Expense.findAll({
    raw: true,
    where: { ExpensePoolId: req.params.id },
  })
    .then(expenses => res.send(expenses))
    .catch(handleError(res));
};

controller.getOneExpense = (req, res) => {
  Expense.findById(req.params.expenseId)
    .then(expenses => res.send(expenses))
    .catch(handleError(res));
};

export default controller;
