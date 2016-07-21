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


controller.addUserToPool = (req, res) => {
  ExpensePool.findById(req.params.id)
    .then(expensePool => {
      return User.findById(req.body.userId)
        .then(user => expensePool.hasUser(user)
          .then(result => {
            if (result) {
              return res.status(403).send('User already exists in pool');
            }
            return expensePool.addUser(user)
              .then(res.sendStatus(201));
          }));
    })
    .catch(error => handleError(res, error));
};

// project.hasUser(user).then(function(result) {
//       // result would be false
//       return project.addUser(user).then(function() {
//         return project.hasUser(user).then(function(result) {
//           // result would be true
//         })
//       })

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

export default controller;
