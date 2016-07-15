var Sequelize = require('sequelize');
var db = new Sequelize('divvy', 'root', ''); // name, username, password

// TO DO: 
//   1) Confirm Facebook user id data type
//   2) Confirm that friend list can be sorted dynmanically via FB API
//      (avoid storing all linked Facebook friends internally)
var User = db.define('User', {
  fb_id: Sequelize.INTEGER,
  fname: Sequelize.STRING,
  lname: Sequelize.STRING,
  img_file: Sequelize.STRING,
  gender: Sequelize.STRING,
  active: Sequelize.BOOLEAN,
  created: Sequelize.DATE,
  first_login: Sequelize.DATE
});

var Expenses = db.define('Expenses', {
  expense_id: Sequelize.INTEGER,
  amount: Sequelize.DECIMAL(10, 2),
  entered_by_id: Sequelize.INTEGER,
  paid_by_id: Sequelize.INTEGER,
  exp_pool_id: Sequelize.INTEGER,
  created: Sequelize.DATE,
  paid: Sequelize.DATE
});

var ExpensePools = db.define('ExpensePools', {
  epool_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  entered_by_id: Sequelize.INTEGER,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
  closed: Sequelize.BOOLEAN
});

var Expenses_Users = db.define('Expenses_Users', {
  user_id: Sequelize.INTEGER,
  expense_id: Sequelize.INTEGER,
  paid: Sequelize.DATE,
  percent: Sequelize.INTEGER
});

var Users_ExpensePools = db.define('Users_ExpensePools', {
  epool_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER
})
