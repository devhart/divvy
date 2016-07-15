var Sequelize = require('sequelize');
var db = new Sequelize('divvy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
}); // name, username, password

Sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


// TO DO: 
//   1) Confirm Facebook user id data type
//   2) Confirm that friend list can be sorted dynmanically via FB API
//      (avoid storing all linked Facebook friends internally)
var Users = db.define('Users', {
  fb_id: Sequelize.INTEGER,
  fname: Sequelize.STRING,
  lname: Sequelize.STRING,
  img_file: Sequelize.STRING,
  gender: Sequelize.STRING,
  active: Sequelize.BOOLEAN,
  created: Sequelize.DATE,
  first_login: Sequelize.DATE
});


// Pool / Category of expenses, e.g. 'Trip to Rome'
var ExpensePools = db.define('ExpensePools', {
  epool_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
  closed: Sequelize.BOOLEAN
});
ExpensePools.belongsTo(Users, {foreignKey: 'entered_by_id'});


// Individual line-item item expenses
var Expenses = db.define('Expenses', {
  expense_id: Sequelize.INTEGER,
  amount: Sequelize.DECIMAL(10, 2),
  created: Sequelize.DATE,
  paid: Sequelize.DATE
});
Expenses.belongsTo(Users, {foreignKey: 'entered_by_id'});
Expenses.belongsTo(Users, {foreignKey: 'paid_by_id'}); // Person that put down their card $$$
Expenses.belongsTo(ExpensePools, {foreignKey: 'exp_pool_id'});


// Users assigned to a single line-item expense 
// e.g. expense 'stag dinner' has three users, all of whom are also tied
//      to 'car rental' and one of whom is listed on 'booze'
var Users_Expenses = db.define('User_Expensess', {
  paid: Sequelize.DATE,
  percent: Sequelize.INTEGER
});
Users.belongsToMany(Expenses, {as: 'user_id', through: 'User_Expenses'});
Expenses.belongsToMany(Users, {as: 'expense_id', through: 'User_Expenses'});


// List of users within an expense pool
var ExpensePools_Users = db.define('ExpensePool_Users', {});
Users.belongsToMany(ExpensePools, {through: 'ExpensePools_Users'});


// Test user sync
Users.sync()
  .then(function() {
    return Users.create({fname: 'Jean', lname: 'Valjean'});
  })
  .then(function() {
    return Users.findAll({ where: {fname: 'Jean', lname: 'Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.fname + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    console.error(err);
    db.close();
  });
