import { User } from '../../db';
import { handleError, handleNotFound } from '../../utils';

const controller = {};

controller.all = (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(handleError(res));
};

controller.get = (req, res) => {
  User.findById(req.params.id)
    .then(handleNotFound(res))
    .then(user => {
      if (user) {
        res.json(user);
      }
    })
    .catch(handleError(res));
};

controller.me = (req, res) => {
  res.json(req.user);
};

controller.myPools = (req, res) => {
  req.user.getExpensePools()
    .then(expensePools => res.json(expensePools))
    .catch(handleError(res));
};

export default controller;
