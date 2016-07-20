const controller = {};

controller.getUserPoolExpenses = (req, res) => {
  res.send(`getUserPoolExpenses ${req.params.id}, ${req.params.expPoolId}`);
};

controller.getUserPools = (req, res) => {
  res.send(`getUserPools for user id: ${req.params.id}`);
};

controller.getUserExpenses = (req, res) => {
  res.send(`getUserExpenses for user id: ${req.params.id}`);
};

controller.getUser = (req, res) => {
  res.send(`getUser for user id: ${req.params.id}`);
};

controller.addUserExpense = (req, res) => {
  res.send('addUserExpense');
};

controller.addUserToPool = (req, res) => {
  res.send('addUserToPool');
};

controller.addUser = (req, res) => {
  res.send('addUser');
};

export default controller;
