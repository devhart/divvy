const Sequelize = require('sequelize');
const db = new Sequelize('divvy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
}); // name, username, password

db
  .authenticate()
  .then((err) => {
    if (!err) {
      console.log('Connection has been established successfully.');
    }
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });


// TO DO:
//   1) Confirm Facebook user id data type
//   2) Confirm that friend list can be sorted dynmanically via FB API
//      (avoid storing all linked Facebook friends internally)
const Users = db.define('Users', {
  fb_id: Sequelize.INTEGER,
  fname: Sequelize.STRING,
  lname: Sequelize.STRING,
  img_file: Sequelize.STRING,
  gender: Sequelize.STRING,
  active: Sequelize.BOOLEAN,
  created: Sequelize.DATE,
  first_login: Sequelize.DATE,
});


// Pool / Category of expenses, e.g. 'Trip to Rome'
const ExpensePools = db.define('ExpensePools', {
  epool_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
  closed: Sequelize.BOOLEAN,
});
ExpensePools.belongsTo(Users, { foreignKey: 'entered_by_id' });


// Individual line-item item expenses
const Expenses = db.define('Expenses', {
  expense_id: Sequelize.INTEGER,
  amount: Sequelize.DECIMAL,
  created: Sequelize.DATE,
  paid: Sequelize.DATE,
});
Expenses.belongsTo(Users, { foreignKey: 'entered_by_id' });
Expenses.belongsTo(Users, { foreignKey: 'paid_by_id' }); // Person that put down their card $$$
Expenses.belongsTo(ExpensePools, { foreignKey: 'exp_pool_id' });


// Users assigned to a single line-item expense
// e.g. expense 'stag dinner' has three users, all of whom are also tied
//      to 'car rental' and one of whom is listed on 'booze'
const UsersExpenses = db.define('User_Expensess', {
  paid: Sequelize.DATE,
  percent: Sequelize.INTEGER,
});
Users.belongsToMany(Expenses, { as: 'user_id', through: 'User_Expenses' });
Expenses.belongsToMany(Users, { as: 'expense_id', through: 'User_Expenses' });


// List of users within an expense pool
const ExpensePoolsUsers = db.define('ExpensePool_Users', {});
Users.belongsToMany(ExpensePools, { through: 'ExpensePools_Users' });
