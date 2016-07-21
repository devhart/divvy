import { ExpensePool, User } from '../../db';

const controller = {};

const handleError = (res, error) => {
  console.log(error);
  res.sendStatus(500);
};

controller.addPool = (req, res) => {
  const obj = {};
  ExpensePool.create(req.body, ['name', 'description', 'imgUrl'])
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

// ------------ Controllers above have updated routes ----------------

controller.getPool = (req, res) => {
  ExpensePool.findById(req.params.id)
  .then(expensePool => res.send(expensePool))
  .catch(error => handleError(res, error));
};

// Used in testing
controller.getPools = (req, res) => {
  ExpensePool.findAll({
    raw: true,
  })
  .then(expensePool => res.send(expensePool))
  .catch(error => handleError(res, error));
};

controller.updatePool = (req, res) => {
  // TODO: Update update object's values
  //       To be taken from req.body object
  ExpensePool.update(
    {
      name: 'new updated pool name',
      description: 'new description',
    },
    {
      where: { _id: req.params.id },
    })
  .then(expensePool => {
    res.send(expensePool.get({
      plain: true,
    }));
  })
  .catch(error => handleError(res, error));
};

controller.addUserToPool = (req, res) => {
  // TODO: Set correct User-Pool ownership in models
  // TODO: Correct the route to this controller - fails currently
  ExpensePool.findById(req.body.id)
    .then(expensePool => {
      expensePool.addUser(
        User.findById(req.body.userId)
        .catch(error => {
          console.log(error);
          res.sendStatus(500);
        })
      );
    });
};

export default controller;
