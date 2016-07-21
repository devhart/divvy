import { User } from '../../db';

const controller = {};

const handleError = (res, error) => {
  console.log(error);
  res.sendStatus(500);
};

controller.me = (req, res) => {
  res.json(req.user);
};

controller.getUserPools = (req, res) => {
  req.user.getExpensePools()
    .then(expensePools => res.json(expensePools))
    .catch(error => handleError(res, error));
};

// Returns current user, and users in pool
controller.getAllUsers = (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(error => handleError(res, error));
};


// ------------ Routes above have updated controllers ----------------

controller.getUserPoolExpenses = (req, res) => {
  res.send(`getUserPoolExpenses ${req.params.id}, ${req.params.expPoolId}`);
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

controller.addUser = (req, res) => {
  res.send('addUser');
};

export default controller;
