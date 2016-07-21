import { Expense, ExpensePool } from '../../../database/database';
const controller = {};

controller.addExpense = (req, res) => {
  ExpensePool.findById(req.params.id)
    .then(expensePool => {
      console.log('expensePool:', expensePool);
      Expense.create({
        name: 'more data',
        description: 'yes',
        amount: 8.97,
        paid: false,
      }, ['name', 'description', 'amount', 'paid'])
      .then(expense => expense.setExpensePool(expensePool))
      .then(expense => {
        console.log('expense is now:', expense);
        res.send(expense.get({
          plain: true,
        }));
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
    });
};

// ------------ Routes above have updated controllers ----------------

// GET => All expenses
// TODO: Fix to return info
controller.getExpenses = (req, res) => {
  Expense.findAll({
    raw: true,
    where: { ExpensePoolId: req.params.id },
  })
  .then(expenses => {
    res.send(expenses);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

// TODO: FIX ME!
// POST => update a specific expense
controller.editExpense = (req, res) => {
  const epoolId = req.body.epoolId || 1;  // default to 1 for testing
  ExpensePool.findById(epoolId)
    .then(expensePool => {
      expensePool.setExpense(
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
        })
      );
    });
};

// GET => specific expense
controller.getOneExpense = (req, res) => {
  const expenseId = req.params.expenseId;
  Expense.findById(expenseId)
  .then(expenses => {
    res.send(expenses);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

export default controller;
