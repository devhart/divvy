import db, { User, ExpensePool, Expense } from '../../db';

const cleanModels = () => User.destroy({ where: {} })
  .then(() => ExpensePool.destroy({ where: {} }))
  .then(() => Expense.destroy({ where: {} }));

describe('ExpensePool Model', () => {
  before(() => db.sync().then(cleanModels));

  afterEach(cleanModels);

  it('should begin with no expense pools', () => {
    return ExpensePool.findAll().should.eventually.have.length(0);
  });

  describe('Constraints', () => {
    it('should build and save a new ExpensePool', () => {
      const expensePoolRecord = {};
      return ExpensePool.create(expensePoolRecord).then(expensePool => {
        expensePool.should.have.property('_id');
        expensePool._id.should.not.be.null;
        return ExpensePool.findById(expensePool._id).then(found => {
          found._id.should.equal(expensePool._id);
        });
      });
    });
  });

  describe('Relationships', () => {
    const userRecords = [
      { name: 'User1', email: 'user1@example.com' },
      { name: 'User2', email: 'user2@example.com' },
    ];
    const expensePoolRecords = [
      { name: 'Pool1' },
      { name: 'Pool2' },
    ];
    const expenseRecords = [
      { name: 'Expense1' },
      { name: 'Expense2' },
    ];
    let user1;
    let user2;
    let pool1;
    let pool2;
    let expense1;
    let expense2;

    beforeEach(() => {
      return User.bulkCreate(userRecords)
        .then(() => User.all())
        .then(users => [user1, user2] = users)
        .then(() => ExpensePool.bulkCreate(expensePoolRecords))
        .then(() => ExpensePool.all())
        .then(pools => [pool1, pool2] = pools)
        .then(() => Expense.bulkCreate(expenseRecords))
        .then(() => Expense.all())
        .then(expenses => [expense1, expense2] = expenses);
    });

    it('should bulk create user, pools and expenses', () => {
      user1.email.should.equal('user1@example.com');
      user2.email.should.equal('user2@example.com');
      pool1.name.should.equal('Pool1');
      pool2.name.should.equal('Pool2');
      expense1.name.should.equal('Expense1');
      expense2.name.should.equal('Expense2');
    });

    describe('User', () => {
      describe('#addUser', () => {
        it('should add a user to an expense pool', () => {
          return pool1.addUser(user1)
            .then(() => pool1.getUsers())
            .then(poolUsers => {
              poolUsers.should.contain.a.thing.with.property('_id', user1._id);
              poolUsers.should.not.contain.a.thing.with.property('_id', user2._id);
            });
        });

        it('should allow multiple expense pools to be associated', () => {
          return pool1.addUser(user1)
            .then(() => pool1.addUser(user2))
            .then(() => pool1.getUsers())
            .then(poolUsers => {
              poolUsers.should.contain.a.thing.with.property('_id', user1._id);
              poolUsers.should.contain.a.thing.with.property('_id', user2._id);
            });
        });

        it('should not add users more than once', () => {
          return pool1.addUser(user1)
            .then(() => pool1.addUser(user1))
            .then(() => pool1.getUsers())
            .then(poolUsers => {
              poolUsers.should.contain.a.thing.with.property('_id', user1._id);
              poolUsers.should.have.length(1);
            });
        });

        it('should allow for users to be added to different pools', () => {
          return pool1.addUser(user1)
            .then(() => pool2.addUser(user1))
            .then(() => pool1.getUsers())
            .then(pool1Users => {
              pool1Users.should.contain.a.thing.with.property('_id', user1._id);
              pool1Users.should.have.length(1);
            })
            .then(() => pool2.getUsers())
            .then(pool2Users => {
              pool2Users.should.contain.a.thing.with.property('_id', user1._id);
              pool2Users.should.have.length(1);
            });
        });
      });
    });

    describe('Expense', () => {
      describe('#addExpense', () => {
        it('should add an expense to an expense pool', () => {
          return pool1.addExpense(expense1)
            .then(() => pool1.getExpenses())
            .then(poolExpenses => {
              poolExpenses.should.contain.a.thing.with.property('_id', expense1._id);
              poolExpenses.should.not.contain.a.thing.with.property('_id', expense2._id);
            });
        });

        it('should allow multiple expenses to be associated', () => {
          return pool1.addExpense(expense1)
            .then(() => pool1.addExpense(expense2))
            .then(() => pool1.getExpenses())
            .then(poolExpenses => {
              poolExpenses.should.contain.a.thing.with.property('_id', expense1._id);
              poolExpenses.should.contain.a.thing.with.property('_id', expense2._id);
            });
        });

        it('should not add expenses more than once', () => {
          return pool1.addExpense(expense1)
            .then(() => pool1.addExpense(expense1))
            .then(() => pool1.getExpenses())
            .then(poolExpenses => {
              poolExpenses.should.contain.a.thing.with.property('_id', expense1._id);
              poolExpenses.should.have.length(1);
            });
        });
      });
    });
  });
});
