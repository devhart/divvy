import { ExpensePool } from '../../database/database';

const controller = {};

controller.addPool = (req, res) => {
  // TODO: Update create object's values
  //       To be taken from req.body object
  ExpensePool.create({
    name: 'test1',
    description: 'trying to input a value',
    closed: false,
  }, ['name', 'description', 'closed'])
  .then(expensePool => {
    res.send(expensePool.get({
      plain: true,
    }));
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

controller.getPool = (req, res) => {
  ExpensePool.findAll({
    where: { _id: req.params.id },
    raw: true,
  })
  .then(expensePool => {
    res.send(expensePool);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

controller.getPools = (req, res) => {
  ExpensePool.findAll({
    raw: true,
  })
  .then(expensePool => {
    res.send(expensePool);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
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
      where: { _id: req.body.id },
    })
  .then(expensePool => {
    res.send(expensePool.get({
      plain: true,
    }));
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

controller.addUserToPool = (req, res) => {
  // TODO: Set correct User-Pool ownership in models
  // TODO: Correct the route to this controller - fails currently
  res.send(`addUserToPool where pool is: ${req.params.id} and user is: ${req.params.userId}`);
};

export default controller;
