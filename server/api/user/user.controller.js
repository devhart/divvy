import { User } from '../../db';
import { handleError } from '../../utils';

const controller = {};

controller.me = (req, res) => {
  res.json(req.user);
};

controller.getUserPools = (req, res) => {
  req.user.getExpensePools()
    .then(expensePools => res.json(expensePools))
    .catch(handleError(res));
};

// Returns current user, and users in pool
controller.getAllUsers = (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(handleError(res));
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
