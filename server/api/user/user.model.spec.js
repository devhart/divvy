import db, { User, ExpensePool, Expense } from '../../database/database';

const cleanModels = () => User.destroy({ where: {} })
  .then(() => ExpensePool.destroy({ where: {} }))
  .then(() => Expense.destroy({ where: {} }));

describe('User Model', () => {
  const email = 'test@example.com';

  before(() => db.sync().then(cleanModels));

  afterEach(cleanModels);

  it('should begin with no users', () => {
    return User.findAll().should.eventually.have.length(0);
  });

  describe('#create', () => {
    it('should build and save a new User', () => {
      const user = { name: 'Fake User', email };
      return User.create(user).then(created => {
        created.should.have.property('_id');
        created.name.should.equal(user.name);
        created.email.should.equal(user.email);
        return User.findById(created._id).then(found => {
          found._id.should.equal(created._id);
          found.name.should.equal(created.name);
          found.email.should.equal(created.email);
        });
      });
    });

    describe('email', () => {
      const invalidEmail = 'not-an-email';

      it('should fail when creating with an invalid email', () => {
        const user = { name: 'Fake User', email: invalidEmail };
        return User.create(user).should.be.rejected;
      });

      it('should fail when saving with an invalid email', () => {
        const user = { name: 'Fake User', email };
        return User.create(user).then(created => {
          created.email = invalidEmail;
          return created.save().should.be.rejected;
        });
      });

      it('should fail when saving duplicate email', () => {
        const user1 = { name: 'Fake User 1', email };
        const user2 = { name: 'Fake User 2', email };
        return User.create(user1).then(() => {
          return User.create(user2).should.be.rejected;
        });
      });
    });
  });

  describe('Relationships', () => {
    const userRecord = { name: 'User1', email };
    const expensePoolRecords = [{
      name: 'Pool1',
    }, {
      name: 'Pool2',
    }];
    const expenseRecords = [{
      name: 'Expense1',
    }, {
      name: 'Expense2',
    }];
    let user;
    let pool1;
    let pool2;
    let expense1;
    let expense2;

    beforeEach(() => {
      return User.create(userRecord)
        .then(createdUser => user = createdUser)
        .then(() => ExpensePool.bulkCreate(expensePoolRecords))
        .then(() => ExpensePool.all())
        .then(pools => [pool1, pool2] = pools)
        .then(() => Expense.bulkCreate(expenseRecords))
        .then(() => Expense.all())
        .then(expenses => [expense1, expense2] = expenses);
    });

    it('should bulk create user, pools and expenses', () => {
      user.email.should.equal(email);
      pool1.name.should.equal('Pool1');
      pool2.name.should.equal('Pool2');
      expense1.name.should.equal('Expense1');
      expense2.name.should.equal('Expense2');
    });

    describe('ExpensePool', () => {
      describe('#addExpensePool', () => {
        it('should add expense pool to user\'s expense pools', () => {
          return user.addExpensePool(pool1)
            .then(() => user.getExpensePools())
            .then(userPools => {
              userPools.should.contain.a.thing.with.property('_id', pool1._id);
              userPools.should.not.contain.a.thing.with.property('_id', pool2._id);
            });
        });

        it('should allow multiple expense pools to be associated', () => {
          return user.addExpensePool(pool1)
            .then(() => user.addExpensePool(pool2))
            .then(() => user.getExpensePools())
            .then(userPools => {
              userPools.should.contain.a.thing.with.property('_id', pool1._id);
              userPools.should.contain.a.thing.with.property('_id', pool2._id);
            });
        });
      });
    });

    describe('Expense', () => {
      describe('#addExpense', () => {
        it('should add expense to user\'s expenses', () => {
          return user.addExpense(expense1)
            .then(() => user.getExpenses())
            .then(userExpenses => {
              userExpenses.should.contain.a.thing.with.property('_id', expense1._id);
              userExpenses.should.not.contain.a.thing.with.property('_id', expense2._id);
            });
        });

        it('should allow multiple expenses to be associated', () => {
          return user.addExpense(expense1)
            .then(() => user.addExpense(expense2))
            .then(() => user.getExpenses())
            .then(userExpenses => {
              userExpenses.should.contain.a.thing.with.property('_id', expense1._id);
              userExpenses.should.contain.a.thing.with.property('_id', expense2._id);
            });
        });
      });
    });
  });
});
