import { ExpensePool, User } from '../../db';
import { handleError } from '../../utils';

const controller = {};

controller.create = (req, res) => {
  const opts = { include: [{ all: true, nested: true }] };
  ExpensePool.create(req.body)
    .then(expensePool => (req.expensePool = expensePool))
    .then(expensePool => expensePool.addUser(req.user))
    .then(() => ExpensePool.findById(req.expensePool._id, opts))
    .then(expensePool => res.json(expensePool))
    .catch(handleError(res));
};

controller.get = (req, res) => {
  res.json(req.expensePool);
};

controller.update = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  req.expensePool.updateAttributes(req.body)
    .then(updated => res.json(updated))
    .catch(handleError(res));
};

controller.addUser = (req, res) => {
  req.expensePool.hasUser(req.body.userId)
    .then(isMember => {
      if (isMember) {
        return res.status(403).send('User already exists in pool');
      }
      return User.findById(req.body.userId)
        .then(userToAdd => req.expensePool.addUser(userToAdd))
        .then(() => res.sendStatus(201));
    })
    .catch(handleError(res));
};

controller.listUsers = (req, res) => {
  req.expensePool.getUsers()
    .then(users => res.json(users))
    .catch(handleError(res));
};

export default controller;
