import { Expense } from '../../../database/database';

const controller = {};

controller.addExpense = (req, res) => {
  Expense.create({
    name: 'dummy expense',
    description: 'test posting',
    amount: 40.52,
    paid: false,
  }, ['name', 'description', 'amount', 'paid'])
  .then(expense => {
    res.send(expense.get({
      plain: true,
    }));
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

// GET => All expenses
// TODO: Fix to return info
controller.getExpenses = (req, res) => {
  Expense.findAll({
    raw: true,
  })
  .then(expenses => {
    res.send(expenses);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

// POST => update a specific expense
controller.editExpense = (req, res) => {
  Expense.update(
    {
      name: 'new updated EXPENSE name',
      description: 'new description',
    },
    {
      where: { _id: req.body.id },
    })
  .then(expense => {
    res.send(expense.get({
      plain: true,
    }));
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
  res.send('editExpense');
};

// GET => specific expense
controller.getOneExpense = (req, res) => {
  Expense.findAll({
    where: { _id: req.params.expenseId },
    raw: true,
  })
  .then(expenses => {
    res.send(expenses);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

export default controller;
