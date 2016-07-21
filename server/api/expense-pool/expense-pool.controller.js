import { ExpensePool, User } from '../../db';

const controller = {};

const handleError = (res, error) => {
  console.log(error);
  res.sendStatus(500);
};

controller.create = (req, res) => {
  const obj = {};
  ExpensePool.create(req.body)
    .then(expensePool => {
      obj.expensePool = expensePool;
      return expensePool.addUser(req.user);
    })
    .then(expensePoolUsers => {
      obj.expensePoolUsers = expensePoolUsers;
      res.json(obj);
    })
    .catch(error => handleError(res, error));
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
    .catch(error => handleError(res, error));
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
    .catch(error => handleError(res, error));
};

controller.listUsers = (req, res) => {
  req.expensePool.getUsers()
    .then(users => res.json(users))
    .catch(error => handleError(res, error));
};

export default controller;
