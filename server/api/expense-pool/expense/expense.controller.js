import { Expense, ExpensePool } from '../../../db';

const controller = {};

const handleError = (res, error) => {
  console.log(error);
  res.sendStatus(500);
};

controller.addExpense = (req, res) => {
  ExpensePool.findById(req.params.id)
    .then(expensePool => {
      // Closure provides setExpense pool with access to expensePool
      return Expense.create(req.body)
        .then(expense => expense.setExpensePool(expensePool))
        .then(expense => res.send(expense.get({ plain: true })));
    })
    .catch(error => handleError(res, error));
};

controller.editExpense = (req, res) => {
  Expense.findById(req.params.expenseId)
    .then(expense => expense.updateAttributes(req.body))
    .then(() => res.sendStatus(204))
    .catch(error => handleError(res, error));
};

controller.getExpenses = (req, res) => {
  Expense.findAll({
    raw: true,
    where: { ExpensePoolId: req.params.id },
  })
  .then(expenses => res.send(expenses))
  .catch(error => handleError(res, error));
};

controller.getOneExpense = (req, res) => {
  Expense.findById(req.params.expenseId)
    .then(expenses => res.send(expenses))
    .catch(error => handleError(res, error));
};

export default controller;
