import { ExpensePool } from '../../database/database';
const controller = {};

controller.addPool = (req, res) => {
  ExpensePool.create({
    name: 'test1',
    description: 'trying to input a value',
    closed: false,
  }, ['name', 'description', 'closed'])
  .then(expensePool => {
    res.send(expensePool.get({
      plain: true,
    }));
  });
};


controller.getPool = (req, res) => {
  // find information
  // req.params.id
  // if error, sendStatus
  // otherwise send data
  res.send('getPool');
};

controller.updatePool = (req, res) => {
  res.send('updatePool');
};

export default controller;
