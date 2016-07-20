import config from '../config/environment';
import Sequelize from 'sequelize';

const db = new Sequelize(config.sequelize.uri, config.sequelize.options);

export const User = db.import('../api/user/user.model');
export const ExpensePool = db.import('../api/expense-pool/expense-pool.model');
export const Expense = db.import('../api/expense-pool/expense/expense.model');

User.belongsToMany(ExpensePool, { through: 'ExpensePoolUser' });
ExpensePool.belongsToMany(User, { through: 'ExpensePoolUser' });

// Expense.belongsTo(ExpensePool);
Expense.hasOne(ExpensePool, { foreignKey: 'ExpensePoolId' });
Expense.belongsToMany(User, { through: 'ExpenseUser' });
User.belongsToMany(Expense, { through: 'ExpenseUser' });

/*
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
 ExpensePools.hasOne(User, { foreignKey: 'entered_by_id' });
 User.belongsTo(ExpensePools, { foreignKey: 'entered_by_id' });

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

 Expenses.hasOne(User, { foreignKey: 'paid_by_id' });
 Expenses.hasOne(User, { foreignKey: 'entered_by_id' });
 User.belongsTo(Expenses);

 // MODEL: ExpensePools_User
 ExpensePools.belongsToMany(User,
 { as: 'ExpensePools', through: 'ExpensePools_User', foreignKey: 'epool_id' });
 User.belongsToMany(ExpensePools,
 { as: 'User', through: 'ExpensePools_User', foreignKey: 'user_id' });

 // MODEL: UserEXPENSES
 // User assigned to a single line-item expense
 // e.g. expense 'stag dinner' has three User, all of whom are also tied
 //      to 'car rental' and one of whom is listed on 'booze'
 const UserExpenses = db.define('UserExpenses', {
 paid: Sequelize.DATE,
 percent: Sequelize.INTEGER,
 });
 Expenses.belongsToMany(User, { as: 'Expenses', through: 'UserExpenses', foreignKey: 'expense_id' });
 User.belongsToMany(Expenses, { as: 'User', through: 'UserExpenses', foreignKey: 'user_id' });

 */
export default db;
