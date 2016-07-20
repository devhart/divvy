import { ExpensePool, User } from '../../database/database';

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
  ExpensePool.findById(req.params.id)
  .then(expensePool => {
    res.send(expensePool);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};

// Used in testing
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
      where: { _id: req.params.id },
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
