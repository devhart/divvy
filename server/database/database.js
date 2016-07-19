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
});

// TO DO:
//   1) Confirm Facebook user id data type
//   2) Confirm that friend list can be sorted dynmanically via FB API
//      (avoid storing all linked Facebook friends internally)
// MODEL: USERS
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

// MODEL: EXPENSE POOLS
// Pool / Category of expenses, e.g. 'Trip to Rome'
const ExpensePools = db.define('ExpensePools', {
  epool_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
  closed: Sequelize.BOOLEAN,
});
ExpensePools.hasOne(Users, { foreignKey: 'entered_by_id' });
Users.belongsTo(ExpensePools, {foreignKey: 'entered_by_id'});

// MODEL: EXPENSES
// Individual line-item item expenses
const Expenses = db.define('Expenses', {
  expense_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  amount: Sequelize.DECIMAL,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
});
ExpensePools.hasMany(Expenses, { foreignKey: 'exp_pool_id' });
Expenses.belongsTo(ExpensePools, { foreignKey: 'exp_pool_id' });

Expenses.hasOne(Users, { foreignKey: 'paid_by_id' });
Expenses.hasOne(Users, { foreignKey: 'entered_by_id' });
Users.belongsTo(Expenses);

// MODEL: ExpensePools_Users
ExpensePools.belongsToMany(Users, { as: 'ExpensePools', through: 'ExpensePools_Users', foreignKey: 'epool_id' });
Users.belongsToMany(ExpensePools, { as: 'Users', through: 'ExpensePools_Users', foreignKey: 'user_id' });

// MODEL: USERSEXPENSES
// Users assigned to a single line-item expense
// e.g. expense 'stag dinner' has three users, all of whom are also tied
//      to 'car rental' and one of whom is listed on 'booze'
const UsersExpenses = db.define('UsersExpenses', {
  paid: Sequelize.DATE,
  percent: Sequelize.INTEGER,
});
Expenses.belongsToMany(Users, { as: 'Expenses', through: 'UsersExpenses', foreignKey: 'expense_id' });
Users.belongsToMany(Expenses, { as: 'Users', through: 'UsersExpenses', foreignKey: 'user_id' });


module.exports = db;
