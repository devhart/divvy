const controller = {};

controller.addExpense = (req, res) => {
  res.send('addExpense');
};

// GET => All expenses
controller.getExpenses = (req, res) => {
  res.send('getExpenses - all');
};

// POST => update a specific expense
controller.editExpense = (req, res) => {
  res.send('editExpense');
};

// GET => specific expense
controller.getOneExpense = (req, res) => {
  res.send('getOneExpense with expenseId: ' + req.params.expenseId);
};

export default controller;
