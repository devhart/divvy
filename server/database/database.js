const Sequelize = require('sequelize');
const db = new Sequelize('divvy', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  freezeTableName: true,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
}); // name, username, password

// db
//   .authenticate()
//   .then((err) => {
//     if (!err) {
//       console.log('Connection has been established successfully.');
//     }
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });


// TO DO:
//   1) Confirm Facebook user id data type
//   2) Confirm that friend list can be sorted dynmanically via FB API
//      (avoid storing all linked Facebook friends internally)
const Users = db.define('Users', {
  user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  fb_id: Sequelize.INTEGER,
  fname: Sequelize.STRING,
  lname: Sequelize.STRING,
  email: Sequelize.STRING,
  img_file: Sequelize.STRING,
  gender: Sequelize.STRING,
  active: Sequelize.BOOLEAN,
  created: Sequelize.DATE,
  first_login: Sequelize.DATE,
});


// Pool / Category of expenses, e.g. 'Trip to Rome'
const ExpensePools = db.define('ExpensePools', {
  epool_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
  closed: Sequelize.BOOLEAN,
});
Users.belongsTo(ExpensePools, { foreignKey: 'entered_by_id' });
ExpensePools.hasOne(Users, { foreignKey: 'entered_by_id' });


// Individual line-item item expenses
const Expenses = db.define('Expenses', {
  expense_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  amount: Sequelize.DECIMAL,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
});
// One person pays for each expense
Users.belongsTo(Expenses, { foreignKey: 'paid_by_id' });
Expenses.hasOne(Users, { foreignKey: 'paid_by_id' });
// One person enters each expense
Users.belongsTo(Expenses, { foreignKey: 'entered_by_id' });
Expenses.hasOne(Users, { foreignKey: 'entered_by_id' });


// ExpensePools.belongsToMany('Expenses', { foreignKey: 'exp_pool_id' });
// Expenses.belongsTo('ExpensePools', { foreignKey: 'exp_pool_id' });

// Users assigned to a single line-item expense
// e.g. expense 'stag dinner' has three users, all of whom are also tied
//      to 'car rental' and one of whom is listed on 'booze'
const UsersExpenses = db.define('UserExpensess', {
  paid: Sequelize.DATE,
  percent: Sequelize.INTEGER,
});
// Users.hasMany(Expenses, { as: 'user_id', through: 'UsersExpenses' });
// Expenses.hasMany(Users, { as: 'expense_id', through: 'UsersExpenses' });

// List of users within an expense pool
const ExpensePoolsUsers = db.define('ExpensePoolUsers', {});
Users.belongsToMany(ExpensePools, { as: 'user_id', through: 'ExpensePoolsUsers' });

module.exports = db;
